import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MessageSquare,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookingRequest {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  message: string | null;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
}


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages'>('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    // Verify admin role using rpc - cast to bypass type checking during sync
    const { data: isAdmin, error } = await (supabase.rpc as any)('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });

    if (error || !isAdmin) {
      await supabase.auth.signOut();
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use raw fetch for booking_requests and contact_messages
      const bookingsRes = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/booking_requests?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        }
      );
      const messagesRes = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_messages?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        }
      );

      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setBookings(data);
      }
      if (messagesRes.ok) {
        const data = await messagesRes.json();
        setMessages(data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch data.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const updateBookingStatus = async (id: string, status: string) => {
    const session = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/booking_requests?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status.' });
    } else {
      toast({ title: 'Success', description: 'Booking status updated.' });
      fetchData();
    }
  };

  const markMessageAsRead = async (id: string) => {
    const session = await supabase.auth.getSession();
    await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_messages?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${session.data.session?.access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ is_read: true }),
      }
    );
    fetchData();
  };

  const deleteBooking = async (id: string) => {
    const session = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/booking_requests?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
      }
    );

    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete.' });
    } else {
      toast({ title: 'Deleted', description: 'Booking deleted successfully.' });
      fetchData();
    }
  };

  const deleteMessage = async (id: string) => {
    const session = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_messages?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${session.data.session?.access_token}`,
        },
      }
    );

    if (!res.ok) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete.' });
    } else {
      toast({ title: 'Deleted', description: 'Message deleted successfully.' });
      fetchData();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">U</span>
              </div>
              <span className="font-bold text-lg text-foreground">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === 'bookings'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
              {pendingCount > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === 'messages'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <h1 className="text-xl font-semibold text-foreground capitalize">
              {activeTab}
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
            <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            Refresh
          </Button>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {bookings.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No booking requests yet.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="medical-card">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">
                                  {booking.full_name}
                                </h3>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-full text-xs font-medium',
                                    booking.status === 'pending' && 'bg-yellow-100 text-yellow-800',
                                    booking.status === 'confirmed' && 'bg-green-100 text-green-800',
                                    booking.status === 'completed' && 'bg-blue-100 text-blue-800',
                                    booking.status === 'cancelled' && 'bg-red-100 text-red-800'
                                  )}
                                >
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                📱 {booking.mobile}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                📍 {booking.address}
                              </p>
                              {booking.message && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  💬 {booking.message}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {formatDate(booking.created_at)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {booking.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="gap-1"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Confirm
                                </Button>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                                >
                                  Complete
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteBooking(booking.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No contact messages yet.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'medical-card',
                            !message.is_read && 'ring-2 ring-primary/50'
                          )}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">
                                  {message.full_name}
                                </h3>
                                {!message.is_read && (
                                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                📱 {message.mobile}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                📍 {message.address}
                              </p>
                              {message.message && (
                                <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded-lg">
                                  {message.message}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {formatDate(message.created_at)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {!message.is_read && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markMessageAsRead(message.id)}
                                  className="gap-1"
                                >
                                  <Eye className="h-4 w-4" />
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
