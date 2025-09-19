import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const TranslationDebug: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${info}`,
    ]);
  };

  useEffect(() => {
    addDebugInfo("Component mounted");

    // Check if Google Translate script exists
    const existingScript = document.querySelector(
      'script[src*="translate.google.com"]'
    );
    if (existingScript) {
      addDebugInfo("Google Translate script already exists");
    }

    // Check if Google Translate is already loaded
    if (window.google?.translate?.TranslateElement) {
      addDebugInfo("Google Translate API already available");
      setIsLoaded(true);
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      try {
        addDebugInfo("Google Translate init callback called");

        if (window.google?.translate?.TranslateElement) {
          addDebugInfo("Creating TranslateElement");

          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,bn,te,ta,mr,gu,kn,ml,pa,or,as,ur",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "debug_translate_element"
          );

          setIsLoaded(true);
          addDebugInfo("TranslateElement created successfully");

          // Check for combo element after a delay
          setTimeout(() => {
            const combo = document.querySelector(
              ".goog-te-combo"
            ) as HTMLSelectElement;
            if (combo) {
              addDebugInfo(
                `Found .goog-te-combo with ${combo.options.length} options`
              );
            } else {
              addDebugInfo("Could not find .goog-te-combo element");
            }
          }, 1000);
        } else {
          addDebugInfo("Google Translate API not available after init");
        }
      } catch (error) {
        addDebugInfo(`Error in init: ${error}`);
      }
    };

    script.onload = () => addDebugInfo("Script loaded successfully");
    script.onerror = () => addDebugInfo("Script failed to load");

    document.head.appendChild(script);
    addDebugInfo("Script added to head");

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const testTranslation = (language: string) => {
    addDebugInfo(`Testing translation to ${language}`);

    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (combo) {
      addDebugInfo(`Setting combo value to ${language}`);
      combo.value = language;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      addDebugInfo("Change event dispatched");
    } else {
      addDebugInfo("No combo element found for translation");
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-background">
      <h3 className="text-lg font-semibold mb-4">Translation Debug Tool</h3>

      <div className="space-y-2 mb-4">
        <p>Status: {isLoaded ? "✅ Loaded" : "⏳ Loading..."}</p>
        <p>
          Script in DOM:{" "}
          {document.querySelector('script[src*="translate.google.com"]')
            ? "✅ Yes"
            : "❌ No"}
        </p>
        <p>
          Google API:{" "}
          {window.google?.translate ? "✅ Available" : "❌ Not Available"}
        </p>
        <p>
          Combo Element:{" "}
          {document.querySelector(".goog-te-combo")
            ? "✅ Found"
            : "❌ Not Found"}
        </p>
      </div>

      <div className="space-x-2 mb-4">
        <Button onClick={() => testTranslation("hi")} size="sm">
          Test Hindi
        </Button>
        <Button onClick={() => testTranslation("es")} size="sm">
          Test Spanish
        </Button>
        <Button onClick={() => testTranslation("en")} size="sm">
          Reset to English
        </Button>
      </div>

      <div id="debug_translate_element" className="border p-2 mb-4 bg-gray-50">
        Google Translate Element (visible for debugging)
      </div>

      <div className="max-h-40 overflow-y-auto bg-gray-100 p-2 rounded text-xs">
        <h4 className="font-semibold mb-2">Debug Log:</h4>
        {debugInfo.map((info, index) => (
          <div key={index} className="mb-1">
            {info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationDebug;
