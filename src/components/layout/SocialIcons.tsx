import { MessageCircle, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Custom Snapchat icon since lucide doesn't have one
const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.032.51-.019.328.056.672.301.893.372.334.892.312 1.372.199.297-.07.551-.127.801-.127.358 0 .638.088.846.184.263.121.381.31.388.427.021.338-.538.584-1.118.851-.088.04-.177.082-.265.124l-.036.018c-.165.08-.29.17-.388.247-.284.221-.359.378-.362.465.016.152.205.405.611.809l.048.049c.652.664 1.548 1.572 1.742 2.548.025.122.052.321-.028.498-.096.215-.324.4-.585.4h-.033c-.243.002-.486-.054-.737-.107l-.14-.03c-.39-.082-.754-.122-1.085-.122-.224 0-.417.019-.575.057-.164.04-.304.077-.42.148-.107.065-.198.165-.257.284-.14.286-.253.673-.369 1.057-.102.336-.355 1.127-1.071 1.392-.288.107-.638.161-1.056.161-.457 0-.917-.077-1.418-.17l-.048-.008c-.179-.034-.494-.104-.79-.104-.324 0-.549.064-.715.11-.258.072-.459.127-.714.127-.279 0-.559-.06-.829-.184-.274-.126-.498-.291-.654-.478-.171-.204-.28-.44-.355-.743-.091-.366-.183-.649-.26-.861-.154-.42-.282-.698-.44-.868-.246-.266-.504-.389-.824-.421-.255-.026-.549-.046-.84-.046-.231 0-.461.016-.689.046-.312.042-.541.059-.739.059-.245 0-.369-.035-.395-.058-.177-.15-.217-.42-.073-.745.101-.228.309-.442.602-.659.223-.165.45-.276.634-.367.169-.084.343-.171.443-.225.274-.148.422-.364.403-.591-.011-.131-.078-.354-.357-.545-.259-.178-.608-.368-.929-.555-.354-.206-.634-.382-.829-.544-.178-.148-.393-.41-.393-.688 0-.164.102-.405.556-.564.175-.061.387-.091.644-.091.258 0 .521.063.708.114.461.125.941.135 1.291-.099.228-.153.285-.364.276-.564-.014-.293-.027-.514-.038-.698-.073-.903-.148-1.842.084-2.763.396-1.568 1.341-2.884 2.739-3.81C9.175.96 10.578.793 11.206.793h1z" />
  </svg>
);

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/1234567890',
    hoverColor: 'hover:text-green-500',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com',
    hoverColor: 'hover:text-pink-500',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com',
    hoverColor: 'hover:text-blue-600',
  },
  {
    name: 'Snapchat',
    icon: SnapchatIcon,
    href: 'https://snapchat.com',
    hoverColor: 'hover:text-yellow-400',
  },
];

const SocialIcons = ({ size = 'md', className }: SocialIconsProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const buttonClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <div className={cn('flex items-center', containerClasses[size], className)}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'rounded-full text-muted-foreground transition-all duration-300',
            buttonClasses[size],
            social.hoverColor,
            'hover:bg-muted'
          )}
          aria-label={social.name}
        >
          <social.icon className={sizeClasses[size]} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
