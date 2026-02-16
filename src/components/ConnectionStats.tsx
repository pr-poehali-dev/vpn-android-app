import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface ConnectionStatsProps {
  isConnected: boolean;
  connectedAt: number | null;
}

const ConnectionStats = ({ isConnected, connectedAt }: ConnectionStatsProps) => {
  const [elapsed, setElapsed] = useState("00:00:00");
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  useEffect(() => {
    if (!isConnected || !connectedAt) {
      setElapsed("00:00:00");
      setDownload(0);
      setUpload(0);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      return;
    }

    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - connectedAt) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, "0");
      const s = (diff % 60).toString().padStart(2, "0");
      setElapsed(`${h}:${m}:${s}`);

      const baseDown = 45 + Math.random() * 30;
      const baseUp = 12 + Math.random() * 10;
      setDownloadSpeed(baseDown);
      setUploadSpeed(baseUp);
      setDownload((prev) => prev + baseDown / 8);
      setUpload((prev) => prev + baseUp / 8);
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, connectedAt]);

  const formatTraffic = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} ГБ`;
    return `${mb.toFixed(1)} МБ`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-5">
        <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
          Время подключения
        </p>
        <p className="text-3xl font-light stat-value tracking-wider text-foreground">
          {elapsed}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[hsl(var(--vpn-surface))] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ArrowDown" size={14} className="text-blue-400" />
            <span className="text-xs text-muted-foreground">Загрузка</span>
          </div>
          <p className="text-lg font-semibold stat-value text-foreground">
            {downloadSpeed.toFixed(1)}
            <span className="text-xs text-muted-foreground ml-1">Мбит/с</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{formatTraffic(download)}</p>
        </div>

        <div className="bg-[hsl(var(--vpn-surface))] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ArrowUp" size={14} className="text-emerald-400" />
            <span className="text-xs text-muted-foreground">Отдача</span>
          </div>
          <p className="text-lg font-semibold stat-value text-foreground">
            {uploadSpeed.toFixed(1)}
            <span className="text-xs text-muted-foreground ml-1">Мбит/с</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{formatTraffic(upload)}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStats;
