import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Icon from "@/components/ui/icon";

interface QrScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onServerAdd: (data: { country: string; city: string; flag: string; ping: number; load: number }) => void;
}

const QrScanner = ({ isOpen, onClose, onServerAdd }: QrScannerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [showManual, setShowManual] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<string>("qr-reader-" + Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode(containerRef.current);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decodedText) => {
            handleQrData(decodedText);
            scanner.stop().catch(() => {});
          },
          () => {}
        );
      } catch {
        if (mounted) {
          setShowManual(true);
          setError("Камера недоступна. Введите данные вручную.");
        }
      }
    };

    startScanner();

    return () => {
      mounted = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [isOpen]);

  const handleQrData = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.country && parsed.city) {
        onServerAdd({
          country: parsed.country,
          city: parsed.city,
          flag: parsed.flag || "🌐",
          ping: parsed.ping || Math.floor(Math.random() * 150) + 10,
          load: parsed.load || Math.floor(Math.random() * 60) + 10,
        });
        onClose();
      } else {
        setError("Неверный формат QR-кода");
      }
    } catch {
      if (data.includes("://")) {
        onServerAdd({
          country: "Пользовательский",
          city: data.split("://")[1]?.split("/")[0] || data,
          flag: "🌐",
          ping: Math.floor(Math.random() * 100) + 20,
          load: Math.floor(Math.random() * 50) + 10,
        });
        onClose();
      } else {
        setError("Не удалось распознать данные сервера");
      }
    }
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      handleQrData(manualInput.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Сканировать QR</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[hsl(var(--vpn-surface))] flex items-center justify-center hover:bg-[hsl(222_40%_15%)] transition-colors"
        >
          <Icon name="X" size={20} className="text-muted-foreground" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {!showManual ? (
          <>
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden bg-black">
              <div id={containerRef.current} className="w-full h-full" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Наведите камеру на QR-код<br />с данными VPN-сервера
            </p>
            <button
              onClick={() => setShowManual(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ввести вручную
            </button>
          </>
        ) : (
          <div className="w-full max-w-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
              <Icon name="QrCode" size={32} className="text-blue-400" />
            </div>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Вставьте ссылку или JSON-данные сервера
            </p>
            <textarea
              value={manualInput}
              onChange={(e) => {
                setManualInput(e.target.value);
                setError(null);
              }}
              placeholder='{"country": "США", "city": "Нью-Йорк", "flag": "🇺🇸"}'
              className="w-full h-28 bg-[hsl(var(--vpn-surface))] rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none focus:ring-1 focus:ring-blue-500/50"
            />
            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}
            <button
              onClick={handleManualSubmit}
              disabled={!manualInput.trim()}
              className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Добавить сервер
            </button>
            {!error?.includes("Камера") && (
              <button
                onClick={() => setShowManual(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Вернуться к сканеру
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
