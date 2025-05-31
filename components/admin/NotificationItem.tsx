type NotificationItemProps = {
    title: string;
    time: string;
  };
  
  export default function NotificationItem({ title, time }: NotificationItemProps) {
    return (
      <div className="p-3 border-b border-gray-200">
        <div className="font-medium text-gray-800">{title}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    );
  }
  