# Google Tag Manager - Instrukcja Konfiguracji

## 🎯 Co zostało zrobione

### ✅ Kod w aplikacji
1. **GA4 Direct Tagging** - Google Analytics 4 (G-T51L4JTDZV) już działa
2. **GTM Container** - GTM-KW755WH8 poprawnie zaimplementowany
3. **dataLayer** - Zainicjalizowany i gotowy
4. **CSP Headers** - Skonfigurowane dla pełnej kompatybilności
5. **Tracking Events** - Dodane do CodePlayground:
   - `walletConnected` - Połączenie z MetaMask
   - `codeExecuted` - Wykonanie kodu (success/error)
   - `codeCopied` - Skopiowanie kodu

---

## 📦 Import konfiguracji GTM (Opcja 1 - Zalecana)

### Krok 1: Przygotuj plik
Plik `gtm-container-config.json` znajduje się w głównym katalogu frontend.

### Krok 2: Import do GTM
1. Wejdź na https://tagmanager.google.com
2. Wybierz kontener **GTM-KW755WH8**
3. W menu bocznym kliknij **Admin** (koło zębate)
4. W sekcji "Container" kliknij **Import Container**
5. **Choose container file**: Wybierz `gtm-container-config.json`
6. **Choose a workspace**: **Existing** → **Default Workspace**
7. **Import option**: **Merge** (Łączenie - zachowa istniejące tagi)
8. Kliknij **Confirm**

### Krok 3: Preview i publikacja
1. Kliknij **Preview** w prawym górnym rogu
2. Wpisz URL: `https://arkiv.network`
3. Sprawdź czy tagi działają
4. Kliknij **Submit** → **Publish**

---

## 🛠️ Ręczna konfiguracja (Opcja 2)

Jeśli import nie działa, możesz skonfigurować ręcznie:

### 1. Variables (Zmienne)

#### Button Location
- **Name**: `Button Location`
- **Type**: Custom JavaScript
- **Code**:
```javascript
function() {
  var btn = {{Click Element}};
  if (!btn) return 'unknown';

  if (btn.closest('section') && btn.closest('section').className.includes('hero')) {
    return 'hero';
  }

  if (btn.closest('footer')) {
    return 'footer';
  }

  if (btn.closest('.docs-content') || btn.closest('[class*="docs"]')) {
    return 'docs';
  }

  if (window.location.pathname.includes('/getting-started')) {
    return 'getting-started';
  }

  return 'body';
}
```

#### Link Domain
- **Name**: `Link Domain`
- **Type**: Custom JavaScript
- **Code**:
```javascript
function() {
  try {
    var url = {{Click URL}};
    if (!url) return 'unknown';
    return new URL(url).hostname;
  } catch(e) {
    return 'invalid-url';
  }
}
```

#### Link Type
- **Name**: `Link Type`
- **Type**: Custom JavaScript
- **Code**:
```javascript
function() {
  var domain = {{Link Domain}};
  if (!domain) return 'unknown';

  if (domain.includes('github.com')) return 'github';
  if (domain.includes('discord.gg') || domain.includes('discord.com')) return 'discord';
  if (domain.includes('twitter.com') || domain.includes('x.com')) return 'social';
  if (domain.includes('golem.network')) return 'golem';
  if (domain.includes('docs.') || domain.includes('documentation')) return 'docs';

  return 'external';
}
```

#### DataLayer Variables
Dla każdej z poniższych, utwórz:
- **Type**: Data Layer Variable
- **Data Layer Variable Name**: [nazwa poniżej]

Zmienne:
- `DLV - language` → `language`
- `DLV - code_type` → `code_type`
- `DLV - execution_status` → `execution_status`
- `DLV - wallet_type` → `wallet_type`
- `DLV - network` → `network`
- `DLV - code_snippet_type` → `code_snippet_type`

---

### 2. Triggers (Wyzwalacze)

#### All Pages
- **Type**: Page View
- **Name**: `All Pages`

#### Click - Get Started Buttons
- **Type**: Click - All Elements
- **Name**: `Click - Get Started Buttons`
- **Fire On**: Some Clicks
- **Condition**: Click Text **matches RegEx** `Build now|Get Started|Quickstart|Getting Started`

#### Click - Litepaper
- **Type**: Click - All Elements
- **Name**: `Click - Litepaper`
- **Fire On**: Some Clicks
- **Condition**: Click URL **contains** `ARKIV_Litepaper`

#### Custom Event - Code Executed
- **Type**: Custom Event
- **Name**: `Custom Event - Code Executed`
- **Event name**: `codeExecuted`

#### Custom Event - Wallet Connected
- **Type**: Custom Event
- **Name**: `Custom Event - Wallet Connected`
- **Event name**: `walletConnected`

#### Custom Event - Code Copied
- **Type**: Custom Event
- **Name**: `Custom Event - Code Copied`
- **Event name**: `codeCopied`

#### Click - External Links
- **Type**: Click - All Elements
- **Name**: `Click - External Links`
- **Fire On**: Some Clicks
- **Conditions**:
  1. Click URL **matches RegEx** `^https?://`
  2. Click URL **does not contain** `arkiv.network`

#### Scroll Depth
- **Type**: Scroll Depth
- **Name**: `Scroll Depth - 25, 50, 75, 90`
- **Vertical Scroll Depths**: 25, 50, 75, 90 (%)

#### Pageview - Getting Started
- **Type**: Page View
- **Name**: `Pageview - Getting Started`
- **Fire On**: Some Page Views
- **Condition**: Page Path **matches RegEx** `/getting-started/(typescript|python)`

---

### 3. Tags (Tagi)

#### GA4 Configuration
- **Type**: Google Analytics: GA4 Configuration
- **Name**: `GA4 - Configuration`
- **Measurement ID**: `G-T51L4JTDZV`
- **Triggering**: `All Pages`

#### Event - Get Started Click
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Get Started Click`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `get_started_click`
- **Event Parameters**:
  - `button_location` = `{{Button Location}}`
  - `button_text` = `{{Click Text}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Click - Get Started Buttons`

#### Event - Litepaper Download
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Litepaper Download`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `litepaper_download`
- **Event Parameters**:
  - `button_location` = `{{Button Location}}`
  - `file_name` = `{{Click URL}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Click - Litepaper`

#### Event - Code Execution
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Code Execution`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `code_execution`
- **Event Parameters**:
  - `language` = `{{DLV - language}}`
  - `code_type` = `{{DLV - code_type}}`
  - `execution_status` = `{{DLV - execution_status}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Custom Event - Code Executed`

#### Event - Wallet Connect
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Wallet Connect`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `wallet_connect`
- **Event Parameters**:
  - `wallet_type` = `{{DLV - wallet_type}}`
  - `network` = `{{DLV - network}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Custom Event - Wallet Connected`

#### Event - Code Copy
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Code Copy`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `code_copy`
- **Event Parameters**:
  - `language` = `{{DLV - language}}`
  - `code_snippet_type` = `{{DLV - code_snippet_type}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Custom Event - Code Copied`

#### Event - External Link Click
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - External Link Click`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `external_link_click`
- **Event Parameters**:
  - `link_url` = `{{Click URL}}`
  - `link_domain` = `{{Link Domain}}`
  - `link_text` = `{{Click Text}}`
  - `link_type` = `{{Link Type}}`
- **Triggering**: `Click - External Links`

#### Event - Scroll Depth
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Scroll Depth`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `scroll_depth`
- **Event Parameters**:
  - `scroll_percentage` = `{{Scroll Depth Threshold}}`
  - `page_path` = `{{Page Path}}`
- **Triggering**: `Scroll Depth - 25, 50, 75, 90`

#### Event - Guide Start
- **Type**: Google Analytics: GA4 Event
- **Name**: `Event - Guide Start`
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `guide_start`
- **Event Parameters**:
  - `guide_type` = Extract from URL (typescript/python)
  - `referrer` = `{{Referrer}}`
- **Triggering**: `Pageview - Getting Started`

---

## ✅ Weryfikacja działania

### 1. Sprawdź w konsoli przeglądarki (F12):
```javascript
// Na stronie arkiv.network
console.log(window.dataLayer)
// Powinno pokazać arrayę z eventami

console.log(window.gtag)
// Powinno pokazać function
```

### 2. Google Tag Assistant:
1. Zainstaluj: [Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Otwórz arkiv.network
3. Kliknij ikonę Tag Assistant
4. Sprawdź czy pokazuje:
   - Google Tag Manager (GTM-KW755WH8)
   - Google Analytics (G-T51L4JTDZV)

### 3. GTM Preview Mode:
1. W GTM kliknij **Preview**
2. Wpisz `https://arkiv.network`
3. Kliknij **Connect**
4. Testuj interakcje:
   - Kliknij "Build now" → Powinien uruchomić `get_started_click`
   - Kliknij "Litepaper" → Powinien uruchomić `litepaper_download`
   - W playground: Run code → `code_execution`
   - W playground: Copy code → `code_copy`
   - W playground: Connect wallet → `wallet_connect`

### 4. Real-time w Google Analytics:
1. Wejdź na https://analytics.google.com
2. **Reports** → **Realtime**
3. Otwórz arkiv.network w nowej karcie
4. Po ~5 sekundach powinieneś zobaczyć:
   - Aktywnych użytkowników
   - Eventy w czasie rzeczywistym

---

## 🎨 Custom Events już zaimplementowane w kodzie

### CodePlayground.tsx
```typescript
// Event 1: Wallet Connected
window.dataLayer.push({
  event: 'walletConnected',
  wallet_type: 'MetaMask',
  network: 'Arkiv ETHWarsaw Testnet',
  page_path: window.location.pathname
});

// Event 2: Code Executed (Success)
window.dataLayer.push({
  event: 'codeExecuted',
  language: 'typescript' | 'python',
  code_type: 'example' | 'custom',
  execution_status: 'success',
  page_path: window.location.pathname
});

// Event 3: Code Executed (Error)
window.dataLayer.push({
  event: 'codeExecuted',
  language: 'typescript' | 'python',
  code_type: 'example' | 'custom',
  execution_status: 'error',
  page_path: window.location.pathname
});

// Event 4: Code Copied
window.dataLayer.push({
  event: 'codeCopied',
  language: 'typescript' | 'python',
  code_snippet_type: 'playground' | title,
  page_path: window.location.pathname
});
```

---

## 📊 Metryki do monitorowania

### Kluczowe konwersje:
1. **get_started_click** - Liczba kliknięć "Build now"
2. **litepaper_download** - Liczba pobrań Litepaper
3. **wallet_connect** - Liczba połączeń wallet
4. **code_execution** (success) - Liczba udanych wykonań kodu

### Engagement:
1. **code_copy** - Kopiowanie kodu = intent użycia
2. **scroll_depth** - Jak głęboko czytają
3. **external_link_click** - Ruch do GitHub/Discord
4. **guide_start** - Rozpoczęcia tutoriali

### Błędy:
1. **code_execution** (error) - Problemy z kodem
2. Filter by `execution_status` = `error`

---

## 🚀 Kolejne kroki (opcjonalnie)

### Dodatkowe eventy do rozważenia:
1. **Section View** - Scrolling do sekcji (Why Arkiv, How it Works)
2. **Video Play** - Odtwarzanie hero video
3. **Use Case Click** - Kliknięcia w karty use cases
4. **Docs Navigation** - Nawigacja w docs (Overview→API→SDK)
5. **Language Switch** - Przełączanie TypeScript ↔ Python

### Dodatkowe tagi:
1. **Facebook Pixel** (jeśli używasz)
2. **LinkedIn Insight Tag** (dla B2B)
3. **Hotjar** (heatmapy)
4. **Intercom** (chat support)

---

## 🆘 Troubleshooting

### Problem: GTM nie ładuje się
**Rozwiązanie**: Sprawdź CSP headers w middleware.ts - są już skonfigurowane

### Problem: dataLayer is undefined
**Rozwiązanie**: Upewnij się że layout.tsx ma script z dataLayer init - już jest

### Problem: Eventy nie pokazują się w GA4
**Rozwiązanie**:
1. Sprawdź czy tag GTM działa w Preview mode
2. Upewnij się że trigger się uruchamia
3. Sprawdź czy Configuration Tag jest połączony z Event Tagami

### Problem: Import kontenera nie działa
**Rozwiązanie**: Użyj opcji 2 (ręczna konfiguracja) lub zmień ID kontenera w JSON

---

## 📞 Kontakt
W razie problemów sprawdź:
- GTM Documentation: https://developers.google.com/tag-manager
- GA4 Documentation: https://developers.google.com/analytics/devguides/collection/ga4

---

**Status**: ✅ Gotowe do użycia
**GA4 ID**: G-T51L4JTDZV
**GTM ID**: GTM-KW755WH8
**Deployment**: Production (https://arkiv.network)
