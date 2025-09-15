import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Comprehensive list of Google Translate supported languages with local names
const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", localName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", localName: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", localName: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "Telugu", localName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", localName: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", localName: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", localName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", localName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", localName: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", localName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", localName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", localName: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", localName: "اردو", flag: "🇵🇰" },
  { code: "ne", name: "Nepali", localName: "नेपाली", flag: "🇳🇵" },
  { code: "si", name: "Sinhala", localName: "සිංහල", flag: "🇱🇰" },
  { code: "my", name: "Myanmar", localName: "မြန်မာ", flag: "🇲🇲" },
  { code: "th", name: "Thai", localName: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", localName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ko", name: "Korean", localName: "한국어", flag: "🇰🇷" },
  { code: "ja", name: "Japanese", localName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", localName: "中文", flag: "🇨🇳" },
  {
    code: "zh-TW",
    name: "Chinese (Traditional)",
    localName: "繁體中文",
    flag: "🇹🇼",
  },
  { code: "id", name: "Indonesian", localName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", localName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", localName: "Filipino", flag: "🇵🇭" },
  { code: "ar", name: "Arabic", localName: "العربية", flag: "🇸🇦" },
  { code: "fa", name: "Persian", localName: "فارسی", flag: "🇮🇷" },
  { code: "he", name: "Hebrew", localName: "עברית", flag: "🇮🇱" },
  { code: "tr", name: "Turkish", localName: "Türkçe", flag: "🇹🇷" },
  { code: "ru", name: "Russian", localName: "Русский", flag: "🇷🇺" },
  { code: "uk", name: "Ukrainian", localName: "Українська", flag: "🇺🇦" },
  { code: "pl", name: "Polish", localName: "Polski", flag: "🇵🇱" },
  { code: "cs", name: "Czech", localName: "Čeština", flag: "🇨🇿" },
  { code: "sk", name: "Slovak", localName: "Slovenčina", flag: "🇸🇰" },
  { code: "hu", name: "Hungarian", localName: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", localName: "Română", flag: "🇷🇴" },
  { code: "bg", name: "Bulgarian", localName: "Български", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", localName: "Hrvatski", flag: "🇭🇷" },
  { code: "sr", name: "Serbian", localName: "Српски", flag: "🇷🇸" },
  { code: "bs", name: "Bosnian", localName: "Bosanski", flag: "🇧🇦" },
  { code: "sl", name: "Slovenian", localName: "Slovenščina", flag: "🇸🇮" },
  { code: "mk", name: "Macedonian", localName: "Македонски", flag: "🇲🇰" },
  { code: "sq", name: "Albanian", localName: "Shqip", flag: "🇦🇱" },
  { code: "lt", name: "Lithuanian", localName: "Lietuvių", flag: "🇱🇹" },
  { code: "lv", name: "Latvian", localName: "Latviešu", flag: "🇱🇻" },
  { code: "et", name: "Estonian", localName: "Eesti", flag: "🇪🇪" },
  { code: "fi", name: "Finnish", localName: "Suomi", flag: "🇫🇮" },
  { code: "sv", name: "Swedish", localName: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", localName: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Danish", localName: "Dansk", flag: "🇩🇰" },
  { code: "is", name: "Icelandic", localName: "Íslenska", flag: "🇮🇸" },
  { code: "de", name: "German", localName: "Deutsch", flag: "🇩🇪" },
  { code: "nl", name: "Dutch", localName: "Nederlands", flag: "🇳🇱" },
  { code: "fr", name: "French", localName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", localName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", localName: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italian", localName: "Italiano", flag: "🇮🇹" },
  { code: "ca", name: "Catalan", localName: "Català", flag: "🏴󠁥󠁳󠁣󠁴󠁿" },
  { code: "eu", name: "Basque", localName: "Euskera", flag: "🏴󠁥󠁳󠁰󠁶󠁿" },
  { code: "gl", name: "Galician", localName: "Galego", flag: "🏴󠁥󠁳󠁧󠁡󠁿" },
  { code: "el", name: "Greek", localName: "Ελληνικά", flag: "🇬🇷" },
  { code: "mt", name: "Maltese", localName: "Malti", flag: "🇲🇹" },
  { code: "cy", name: "Welsh", localName: "Cymraeg", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "ga", name: "Irish", localName: "Gaeilge", flag: "🇮🇪" },
  { code: "sw", name: "Swahili", localName: "Kiswahili", flag: "🇹🇿" },
  { code: "zu", name: "Zulu", localName: "IsiZulu", flag: "🇿🇦" },
  { code: "xh", name: "Xhosa", localName: "IsiXhosa", flag: "🇿🇦" },
  { code: "af", name: "Afrikaans", localName: "Afrikaans", flag: "🇿🇦" },
  { code: "am", name: "Amharic", localName: "አማርኛ", flag: "🇪🇹" },
  { code: "ig", name: "Igbo", localName: "Igbo", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", localName: "Yorùbá", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", localName: "Hausa", flag: "🇳🇬" },
];

// Popular languages for quick access (Indian languages + major international)
const POPULAR_LANGUAGES = [
  "en",
  "hi",
  "bn",
  "te",
  "ta",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "or",
  "as",
  "ur",
  "ar",
  "zh",
  "es",
  "fr",
  "de",
  "ru",
  "ja",
];

interface LanguageSelectorProps {
  className?: string;
  variant?: "default" | "compact";
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = "",
  variant = "default",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load Google Translate API
  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let style: HTMLStyleElement | null = null;

    if (!window.google?.translate) {
      script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: SUPPORTED_LANGUAGES.map(
              (lang) => lang.code
            ).join(","),
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setIsGoogleTranslateLoaded(true);
      };

      document.head.appendChild(script);
    } else {
      setIsGoogleTranslateLoaded(true);
    }

    // Hide the default Google Translate widget
    style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-menu-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-combo { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    if (!isGoogleTranslateLoaded) return;

    setCurrentLanguage(languageCode);

    // Trigger Google Translate
    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = languageCode;
      selectElement.dispatchEvent(new Event("change"));
    } else {
      // Alternative method if direct access fails
      setTimeout(() => {
        const iframe = document.querySelector(
          ".goog-te-menu-frame"
        ) as HTMLIFrameElement;
        if (iframe && iframe.contentDocument) {
          const langLink = iframe.contentDocument.querySelector(
            `[data-value="${languageCode}"]`
          ) as HTMLElement;
          if (langLink) {
            langLink.click();
          }
        }
      }, 100);
    }
  };

  const getCurrentLanguage = () => {
    return (
      SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguage) ||
      SUPPORTED_LANGUAGES[0]
    );
  };

  const getFilteredLanguages = () => {
    if (!searchTerm) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.localName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const popularLanguages = SUPPORTED_LANGUAGES.filter((lang) =>
    POPULAR_LANGUAGES.includes(lang.code)
  );

  const current = getCurrentLanguage();

  if (variant === "compact") {
    return (
      <div className={className}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {popularLanguages.slice(0, 8).map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {currentLanguage === lang.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div id="google_translate_element" style={{ display: "none" }} />
      </div>
    );
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 min-w-[140px] justify-between"
            disabled={!isGoogleTranslateLoaded}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{current.flag}</span>
              <span className="hidden sm:inline">{current.name}</span>
              <span className="sm:hidden">{current.code.toUpperCase()}</span>
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <DropdownMenuSeparator />

          {!searchTerm && (
            <>
              <DropdownMenuLabel className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
                Popular Languages
              </DropdownMenuLabel>
              {popularLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between py-2"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {lang.localName}
                      </span>
                    </div>
                  </span>
                  {currentLanguage === lang.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>All Languages</DropdownMenuLabel>
            </>
          )}

          {getFilteredLanguages().map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between py-2"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {lang.localName}
                  </span>
                </div>
              </span>
              {currentLanguage === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}

          {getFilteredLanguages().length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No languages found matching "{searchTerm}"
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {!isGoogleTranslateLoaded && (
        <div className="text-xs text-muted-foreground mt-1">
          Loading translator...
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
