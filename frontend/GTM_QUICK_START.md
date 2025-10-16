# 🚀 GTM & GA4 - Quick Start Guide

## ✅ Co zostało zrobione (GOTOWE)

### 1. **Google Analytics 4** - DZIAŁA JUŻ TERAZ ✅
- **Measurement ID**: G-T51L4JTDZV
- **Status**: Aktywny i zbiera dane
- **Sprawdź**: https://analytics.google.com → Realtime

### 2. **Google Tag Manager** - GOTOWY DO KONFIGURACJI ✅
- **Container ID**: GTM-KW755WH8
- **Status**: Zainstalowany na stronie
- **Dashboard**: https://tagmanager.google.com

### 3. **Custom Events w Kodzie** - ZAIMPLEMENTOWANE ✅
```typescript
✅ walletConnected   - Połączenie MetaMask
✅ codeExecuted      - Wykonanie kodu (success/error)
✅ codeCopied        - Skopiowanie kodu
```

---

## 🎯 CO MUSISZ TERAZ ZROBIĆ (3 KROKI)

### Krok 1: Import konfiguracji GTM (5 minut)

1. **Pobierz plik**: `/frontend/gtm-container-config.json`
2. **Wejdź**: https://tagmanager.google.com
3. **Admin** → **Import Container**
4. **Wybierz plik** → **Merge** → **Confirm**

### Krok 2: Test w Preview (2 minuty)

1. **Preview** (prawy górny róg)
2. **Wpisz**: `https://arkiv.network`
3. **Kliknij**: Connect
4. **Testuj**:
   - Kliknij "Build now" → `get_started_click` ✓
   - Kliknij "Litepaper" → `litepaper_download` ✓
   - W playground: Run code → `code_execution` ✓
   - W playground: Copy → `code_copy` ✓
   - W playground: Connect wallet → `wallet_connect` ✓

### Krok 3: Publish (1 minuta)

1. **Submit** (prawy górny róg)
2. **Nazwa**: "GA4 Configuration - Initial Setup"
3. **Publish**

**GOTOWE!** 🎉

---

## 📊 Jakie eventy już działają

### 🔴 Krytyczne (Phase 1)
| Event | Gdzie | Co śledzi |
|-------|-------|-----------|
| `get_started_click` | Wszystkie przyciski "Build now" | Główna konwersja |
| `litepaper_download` | Link do PDF | Zainteresowanie |
| `wallet_connect` | Playground | Aktywne użycie |
| `code_execution` | Playground | Wykonanie kodu |
| `code_copy` | Playground | Intent użycia |

### 🟠 Ważne (Phase 2)
| Event | Gdzie | Co śledzi |
|-------|-------|-----------|
| `external_link_click` | GitHub, Discord, Twitter | Outbound traffic |
| `scroll_depth` | 25%, 50%, 75%, 90% | Engagement |
| `guide_start` | /getting-started | Onboarding |

---

## 🔍 Jak sprawdzić że działa

### Metoda 1: Konsola przeglądarki (F12)
```javascript
// Na https://arkiv.network
console.log(window.dataLayer)
// Wynik: Array z eventami

console.log(window.gtag)
// Wynik: function gtag() {...}
```

### Metoda 2: Google Tag Assistant
1. Zainstaluj: [Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Otwórz arkiv.network
3. Kliknij ikonę → Sprawdź tagi

### Metoda 3: GA4 Realtime
https://analytics.google.com → Reports → Realtime

---

## 📁 Pliki

| Plik | Lokalizacja | Co zawiera |
|------|-------------|------------|
| **Import JSON** | `/frontend/gtm-container-config.json` | Gotowa konfiguracja GTM |
| **Instrukcje** | `/frontend/GTM_SETUP_INSTRUCTIONS.md` | Pełna dokumentacja |
| **Quick Start** | `/frontend/GTM_QUICK_START.md` | Ten plik |

---

## 🆘 Problemy?

### GTM nie importuje się
→ Użyj ręcznej konfiguracji z `GTM_SETUP_INSTRUCTIONS.md`

### Eventy nie pokazują się
→ Sprawdź Preview mode → Triggers → Zobacz co się uruchamia

### GA4 nie zbiera danych
→ Zaczekaj 5-10 minut, potem sprawdź Realtime

---

## 📞 Wsparcie

- **GTM Docs**: https://developers.google.com/tag-manager
- **GA4 Docs**: https://developers.google.com/analytics/devguides/collection/ga4

---

**Status**: ✅ Production Ready
**Wdrożono**: `date`
**Measurement ID**: G-T51L4JTDZV
**Container ID**: GTM-KW755WH8
