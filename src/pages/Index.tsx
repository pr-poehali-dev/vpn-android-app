import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";
import VpnButton from "@/components/VpnButton";
import ConnectionStats from "@/components/ConnectionStats";
import ServerList, { servers, type Server } from "@/components/ServerList";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAt, setConnectedAt] = useState<number | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);

  const handleToggle = useCallback(() => {
    if (isConnecting) return;

    if (isConnected) {
      setIsConnected(false);
      setConnectedAt(null);
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setConnectedAt(Date.now());
    }, 2000);
  }, [isConnected, isConnecting]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={22} className="text-blue-400" />
          <span className="font-semibold text-foreground tracking-tight">ShieldVPN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-emerald-400" : "bg-muted-foreground"
          }`} />
          <span className="text-xs text-muted-foreground">
            {isConnected ? "Подключено" : "Отключено"}
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-md">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              {isConnected
                ? `Подключено к ${selectedServer.country}`
                : isConnecting
                ? "Устанавливаю соединение..."
                : "Нажмите для подключения"}
            </p>
          </div>

          <VpnButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggle={handleToggle}
          />

          {isConnected && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ConnectionStats isConnected={isConnected} connectedAt={connectedAt} />
            </div>
          )}
        </div>

        <div className="w-full max-w-md mt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Сервер
          </p>
          <ServerList
            selectedServer={selectedServer}
            onSelect={setSelectedServer}
            isConnected={isConnected}
          />
        </div>
      </main>

      <footer className="px-6 py-4 flex items-center justify-center gap-6 border-t border-border">
        <button className="flex flex-col items-center gap-1 text-blue-400">
          <Icon name="Shield" size={20} />
          <span className="text-[10px]">VPN</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Globe" size={20} />
          <span className="text-[10px]">Серверы</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Settings" size={20} />
          <span className="text-[10px]">Настройки</span>
        </button>
      </footer>
    </div>
  );
};

export default Index;
