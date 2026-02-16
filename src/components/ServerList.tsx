import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
}

interface ServerListProps {
  selectedServer: Server;
  onSelect: (server: Server) => void;
  isConnected: boolean;
}

const servers: Server[] = [
  { id: "nl-1", country: "Нидерланды", city: "Амстердам", flag: "🇳🇱", ping: 24, load: 35 },
  { id: "de-1", country: "Германия", city: "Франкфурт", flag: "🇩🇪", ping: 31, load: 42 },
  { id: "fi-1", country: "Финляндия", city: "Хельсинки", flag: "🇫🇮", ping: 18, load: 28 },
  { id: "us-1", country: "США", city: "Нью-Йорк", flag: "🇺🇸", ping: 95, load: 61 },
  { id: "jp-1", country: "Япония", city: "Токио", flag: "🇯🇵", ping: 142, load: 38 },
  { id: "sg-1", country: "Сингапур", city: "Сингапур", flag: "🇸🇬", ping: 168, load: 22 },
  { id: "gb-1", country: "Великобритания", city: "Лондон", flag: "🇬🇧", ping: 42, load: 55 },
  { id: "ca-1", country: "Канада", city: "Торонто", flag: "🇨🇦", ping: 108, load: 31 },
  { id: "ch-1", country: "Швейцария", city: "Цюрих", flag: "🇨🇭", ping: 35, load: 19 },
  { id: "au-1", country: "Австралия", city: "Сидней", flag: "🇦🇺", ping: 195, load: 27 },
];

const ServerList = ({ selectedServer, onSelect, isConnected }: ServerListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-emerald-400";
    if (ping < 100) return "text-yellow-400";
    return "text-orange-400";
  };

  const getLoadColor = (load: number) => {
    if (load < 40) return "bg-emerald-500";
    if (load < 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[hsl(var(--vpn-surface))] rounded-xl p-4 hover:bg-[hsl(222_40%_15%)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selectedServer.flag}</span>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">{selectedServer.country}</p>
            <p className="text-xs text-muted-foreground">{selectedServer.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs ${getPingColor(selectedServer.ping)}`}>
            {selectedServer.ping} мс
          </span>
          <Icon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            size={18}
            className="text-muted-foreground"
          />
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 bg-[hsl(var(--vpn-surface))] rounded-xl overflow-hidden divide-y divide-border">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => {
                if (!isConnected) {
                  onSelect(server);
                  setIsOpen(false);
                }
              }}
              disabled={isConnected}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                server.id === selectedServer.id
                  ? "bg-blue-500/10"
                  : isConnected
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[hsl(222_40%_15%)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{server.flag}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{server.country}</p>
                  <p className="text-xs text-muted-foreground">{server.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getLoadColor(server.load)}`}
                      style={{ width: `${server.load}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{server.load}%</span>
                </div>
                <span className={`text-xs w-12 text-right ${getPingColor(server.ping)}`}>
                  {server.ping} мс
                </span>
                {server.id === selectedServer.id && (
                  <Icon name="Check" size={16} className="text-blue-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { servers };
export type { Server };
export default ServerList;
