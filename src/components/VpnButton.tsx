import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface VpnButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggle: () => void;
}

const VpnButton = ({ isConnected, isConnecting, onToggle }: VpnButtonProps) => {
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    if (isConnecting) {
      setRipple(true);
    } else {
      setRipple(false);
    }
  }, [isConnecting]);

  const buttonClass = isConnected
    ? "vpn-btn-connected bg-emerald-500/10 border-emerald-500/40"
    : isConnecting
    ? "bg-blue-500/10 border-blue-500/40 animate-pulse"
    : "vpn-btn-idle bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20";

  const iconColor = isConnected
    ? "text-emerald-400"
    : isConnecting
    ? "text-blue-400"
    : "text-blue-400";

  return (
    <div className="relative flex items-center justify-center">
      {(isConnected || isConnecting) && (
        <>
          <div
            className={`absolute w-52 h-52 rounded-full border ${
              isConnected ? "border-emerald-500/10" : "border-blue-500/10"
            }`}
            style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
          />
          <div
            className={`absolute w-44 h-44 rounded-full border ${
              isConnected ? "border-emerald-500/15" : "border-blue-500/15"
            }`}
            style={{ animation: "pulse-ring 3s ease-in-out infinite 0.5s" }}
          />
        </>
      )}

      <button
        onClick={onToggle}
        disabled={isConnecting}
        className={`relative w-36 h-36 rounded-full border-2 flex flex-col items-center justify-center gap-2 transition-all duration-500 cursor-pointer ${buttonClass}`}
      >
        <Icon
          name={isConnected ? "ShieldCheck" : "Shield"}
          size={40}
          className={`${iconColor} transition-colors duration-500`}
        />
        <span className={`text-xs font-medium tracking-wider uppercase ${
          isConnected ? "text-emerald-400" : "text-blue-400"
        }`}>
          {isConnected
            ? "Защищено"
            : isConnecting
            ? "Подключение..."
            : "Подключить"}
        </span>
      </button>
    </div>
  );
};

export default VpnButton;
