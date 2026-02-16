import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SettingsScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsScreen = ({ isOpen, onClose }: SettingsScreenProps) => {
  const [protocol, setProtocol] = useState("WireGuard");
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [dns, setDns] = useState("Автоматический");

  if (!isOpen) return null;

  const protocols = ["WireGuard", "OpenVPN (UDP)", "OpenVPN (TCP)", "IKEv2"];
  const dnsOptions = ["Автоматический", "Cloudflare (1.1.1.1)", "Google (8.8.8.8)", "AdGuard"];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Icon name="ChevronLeft" size={20} />
          <span className="text-sm">Назад</span>
        </button>
        <h2 className="text-lg font-semibold text-foreground">Настройки</h2>
        <div className="w-16" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Подключение</p>
          <div className="bg-[hsl(var(--vpn-surface))] rounded-xl divide-y divide-border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Протокол</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {protocols.map((p) => (
                  <button
                    key={p}
                    onClick={() => setProtocol(p)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                      protocol === p
                        ? "bg-blue-500 text-white"
                        : "bg-[hsl(222_40%_16%)] text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Icon name="Wifi" size={16} className="text-emerald-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Автоподключение</span>
                  <p className="text-xs text-muted-foreground">При запуске приложения</p>
                </div>
              </div>
              <button
                onClick={() => setAutoConnect(!autoConnect)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  autoConnect ? "bg-blue-500" : "bg-[hsl(222_40%_20%)]"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    autoConnect ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Icon name="ShieldOff" size={16} className="text-red-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Kill Switch</span>
                  <p className="text-xs text-muted-foreground">Блокировать трафик без VPN</p>
                </div>
              </div>
              <button
                onClick={() => setKillSwitch(!killSwitch)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  killSwitch ? "bg-blue-500" : "bg-[hsl(222_40%_20%)]"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    killSwitch ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">DNS</p>
          <div className="bg-[hsl(var(--vpn-surface))] rounded-xl divide-y divide-border">
            {dnsOptions.map((option) => (
              <button
                key={option}
                onClick={() => setDns(option)}
                className="w-full p-4 flex items-center justify-between hover:bg-[hsl(222_40%_15%)] transition-colors"
              >
                <span className="text-sm text-foreground">{option}</span>
                {dns === option && (
                  <Icon name="Check" size={16} className="text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">О приложении</p>
          <div className="bg-[hsl(var(--vpn-surface))] rounded-xl divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-foreground">Версия</span>
              <span className="text-sm text-muted-foreground">1.0.0</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-foreground">Протокол</span>
              <span className="text-sm text-muted-foreground">{protocol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
