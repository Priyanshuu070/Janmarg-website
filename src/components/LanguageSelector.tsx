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
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Debug mode for development
  const isDebug = process.env.NODE_ENV === "development";

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selected-language");
    if (
      savedLanguage &&
      SUPPORTED_LANGUAGES.find((lang) => lang.code === savedLanguage)
    ) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Load Google Translate API
  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let style: HTMLStyleElement | null = null;

    // Check if Google Translate is already loaded
    if (window.google?.translate?.TranslateElement) {
      setIsGoogleTranslateLoaded(true);
      return;
    }

    // Load Google Translate script
    script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;

    // Global callback function
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: SUPPORTED_LANGUAGES.map(
                (lang) => lang.code
              ).join(","),
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true,
            },
            "google_translate_element"
          );
          setIsGoogleTranslateLoaded(true);
          setLoadingError(null);
          console.log("Google Translate loaded successfully");

          // Apply saved language after successful initialization
          setTimeout(() => {
            const savedLanguage = localStorage.getItem("selected-language");
            if (
              savedLanguage &&
              savedLanguage !== currentLanguage &&
              savedLanguage !== "en"
            ) {
              setCurrentLanguage(savedLanguage);
              triggerTranslation(savedLanguage);
            }
          }, 1500);
        }
      } catch (error) {
        console.error("Error initializing Google Translate:", error);
      }
    };

    // Handle script load error
    script.onerror = () => {
      console.error("Failed to load Google Translate script");
      setLoadingError("Failed to load translation service");
      setIsGoogleTranslateLoaded(false);
    };

    // Handle script success
    script.onload = () => {
      if (isDebug) console.log("Google Translate script loaded");
    };

    document.head.appendChild(script);

    // Hide the default Google Translate widget
    style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-menu-frame { display: none !important; }
      body { top: 0 !important; }
      .goog-te-combo { display: none !important; }
      .goog-te-gadget { display: none !important; }
      .goog-te-ftab { display: none !important; }
      .skiptranslate { display: none !important; }
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
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  // Helper function to trigger translation
  const triggerTranslation = (languageCode: string) => {
    console.log("Triggering translation to:", languageCode);

    // Method 1: Direct combo access
    let selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectElement) {
      console.log("Found combo element, triggering translation");
      selectElement.value = languageCode;
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));

      // Add visual feedback that translation was triggered
      setTimeout(() => {
        const selectedLang = SUPPORTED_LANGUAGES.find(
          (lang) => lang.code === languageCode
        );
        console.log(
          `Translation to ${selectedLang?.name || languageCode} initiated`
        );
      }, 100);

      return true;
    }

    // Method 2: Wait and retry
    setTimeout(() => {
      selectElement = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (selectElement) {
        console.log("Found combo element on retry");
        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        console.warn("Google Translate combo element not found");

        // Method 3: Force re-initialization (last resort)
        try {
          const gtElement = document.getElementById("google_translate_element");
          if (gtElement && window.google?.translate?.TranslateElement) {
            gtElement.innerHTML = "";
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: SUPPORTED_LANGUAGES.map(
                  (lang) => lang.code
                ).join(","),
                layout:
                  window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
                multilanguagePage: true,
              },
              "google_translate_element"
            );

            setTimeout(() => {
              const newSelectElement = document.querySelector(
                ".goog-te-combo"
              ) as HTMLSelectElement;
              if (newSelectElement) {
                newSelectElement.value = languageCode;
                newSelectElement.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }
            }, 1000);
          }
        } catch (error) {
          console.error("Error in forced re-initialization:", error);
        }
      }
    }, 500);

    return false;
  };

  const handleLanguageChange = (languageCode: string) => {
    if (!isGoogleTranslateLoaded) {
      console.warn("Google Translate not loaded yet");
      return;
    }

    setCurrentLanguage(languageCode);
    localStorage.setItem("selected-language", languageCode);

    // Use the helper function to trigger translation
    triggerTranslation(languageCode);
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

      {!isGoogleTranslateLoaded && !loadingError && (
        <div className="text-xs text-muted-foreground mt-1">
          Loading translator...
        </div>
      )}

      {loadingError && (
        <div className="text-xs text-red-500 mt-1">{loadingError}</div>
      )}
    </div>
  );
};

export default LanguageSelector;
