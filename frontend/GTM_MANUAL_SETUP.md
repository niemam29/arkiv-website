# 🛠️ GTM - Ręczna Konfiguracja (COPY-PASTE)

## ✅ Co jest już gotowe w kodzie

- Google Analytics 4 (G-T51L4JTDZV) - **DZIAŁA**
- Google Tag Manager (GTM-KW755WH8) - **ZAINSTALOWANY**
- Custom Events - **ZAIMPLEMENTOWANE**
- CSP Headers - **SKONFIGUROWANE**

---

## 📋 KROK PO KROKU (15 minut)

### 🎯 KROK 1: Utwórz Variables (5 minut)

Wejdź na https://tagmanager.google.com → **GTM-KW755WH8** → **Variables**

#### 1.1. Button Location
- **Variables** → **New** → **Name**: `Button Location`
- **Variable Type**: **Custom JavaScript**
- **Wklej kod**:

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

- **Save**

#### 1.2. Link Domain
- **Variables** → **New** → **Name**: `Link Domain`
- **Variable Type**: **Custom JavaScript**
- **Wklej kod**:

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

- **Save**

#### 1.3. Link Type
- **Variables** → **New** → **Name**: `Link Type`
- **Variable Type**: **Custom JavaScript**
- **Wklej kod**:

```javascript
function() {
  var domain = {{Link Domain}};
  if (!domain) return 'unknown';

  if (domain.includes('github.com')) return 'github';
  if (domain.includes('discord.gg') || domain.includes('discord.com')) return 'discord';
  if (domain.includes('twitter.com') || domain.includes('x.com')) return 'social';
  if (domain.includes('golem.network')) return 'golem';

  return 'external';
}
```

- **Save**

#### 1.4. DataLayer Variables (x6)
Dla każdej zmiennej:
- **Variables** → **New**
- **Variable Type**: **Data Layer Variable**
- **Data Layer Variable Name**: [wpisz nazwę z tabeli]
- **Save**

| Variable Name | Data Layer Variable Name |
|--------------|--------------------------|
| `DLV - language` | `language` |
| `DLV - code_type` | `code_type` |
| `DLV - execution_status` | `execution_status` |
| `DLV - wallet_type` | `wallet_type` |
| `DLV - network` | `network` |
| `DLV - code_snippet_type` | `code_snippet_type` |

#### 1.5. Aktywuj Built-in Variables
- **Variables** → **Configure** (prawy górny)
- Zaznacz:
  - ✅ Click Element
  - ✅ Click Classes
  - ✅ Click ID
  - ✅ Click URL
  - ✅ Click Text
  - ✅ Page URL
  - ✅ Page Hostname
  - ✅ Page Path
  - ✅ Referrer
  - ✅ Scroll Depth Threshold
  - ✅ Scroll Depth Units

---

### 🎯 KROK 2: Utwórz Triggers (5 minut)

**Triggers** → **New**

#### 2.1. Click - Get Started
- **Name**: `Click - Get Started Buttons`
- **Trigger Type**: **Click - All Elements**
- **This trigger fires on**: **Some Clicks**
- **Conditions**:
  - Click Text **matches RegEx (ignore case)** → `build now|get started|quickstart|getting started`
- **Save**

#### 2.2. Click - Litepaper
- **Name**: `Click - Litepaper`
- **Trigger Type**: **Click - All Elements**
- **This trigger fires on**: **Some Clicks**
- **Conditions**:
  - Click URL **contains** → `ARKIV_Litepaper`
- **Save**

#### 2.3. Click - External Links
- **Name**: `Click - External Links`
- **Trigger Type**: **Click - All Elements**
- **This trigger fires on**: **Some Clicks**
- **Conditions** (obie muszą być spełnione):
  1. Click URL **matches RegEx** → `^https?://`
  2. Click URL **does not contain** → `arkiv.network`
- **Save**

#### 2.4. Custom Event - Code Executed
- **Name**: `Custom Event - Code Executed`
- **Trigger Type**: **Custom Event**
- **Event name**: `codeExecuted`
- **Save**

#### 2.5. Custom Event - Wallet Connected
- **Name**: `Custom Event - Wallet Connected`
- **Trigger Type**: **Custom Event**
- **Event name**: `walletConnected`
- **Save**

#### 2.6. Custom Event - Code Copied
- **Name**: `Custom Event - Code Copied`
- **Trigger Type**: **Custom Event**
- **Event name**: `codeCopied`
- **Save**

#### 2.7. Scroll Depth
- **Name**: `Scroll Depth - 25, 50, 75, 90`
- **Trigger Type**: **Scroll Depth**
- **Vertical Scroll Depths**: **Percentages** → `25, 50, 75, 90`
- **Save**

#### 2.8. Pageview - Getting Started
- **Name**: `Pageview - Getting Started`
- **Trigger Type**: **Page View**
- **This trigger fires on**: **Some Page Views**
- **Conditions**:
  - Page Path **matches RegEx** → `/getting-started/(typescript|python)`
- **Save**

---

### 🎯 KROK 3: Utwórz Tags (5 minut)

**Tags** → **New**

#### 3.1. GA4 Configuration
- **Name**: `GA4 - Configuration`
- **Tag Type**: **Google Analytics: GA4 Configuration**
- **Measurement ID**: `G-T51L4JTDZV`
- **Triggering**: **All Pages**
- **Save**

#### 3.2. Event - Get Started Click
- **Name**: `Event - Get Started Click`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}` (wybierz z listy)
- **Event Name**: `get_started_click`
- **Event Parameters**:
  - **Parameter Name**: `button_location` | **Value**: `{{Button Location}}`
  - **Parameter Name**: `button_text` | **Value**: `{{Click Text}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Click - Get Started Buttons`
- **Save**

#### 3.3. Event - Litepaper Download
- **Name**: `Event - Litepaper Download`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `litepaper_download`
- **Event Parameters**:
  - **Parameter Name**: `button_location` | **Value**: `{{Button Location}}`
  - **Parameter Name**: `file_name` | **Value**: `{{Click URL}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Click - Litepaper`
- **Save**

#### 3.4. Event - Code Execution
- **Name**: `Event - Code Execution`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `code_execution`
- **Event Parameters**:
  - **Parameter Name**: `language` | **Value**: `{{DLV - language}}`
  - **Parameter Name**: `code_type` | **Value**: `{{DLV - code_type}}`
  - **Parameter Name**: `execution_status` | **Value**: `{{DLV - execution_status}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Custom Event - Code Executed`
- **Save**

#### 3.5. Event - Wallet Connect
- **Name**: `Event - Wallet Connect`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `wallet_connect`
- **Event Parameters**:
  - **Parameter Name**: `wallet_type` | **Value**: `{{DLV - wallet_type}}`
  - **Parameter Name**: `network` | **Value**: `{{DLV - network}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Custom Event - Wallet Connected`
- **Save**

#### 3.6. Event - Code Copy
- **Name**: `Event - Code Copy`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `code_copy`
- **Event Parameters**:
  - **Parameter Name**: `language` | **Value**: `{{DLV - language}}`
  - **Parameter Name**: `code_snippet_type` | **Value**: `{{DLV - code_snippet_type}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Custom Event - Code Copied`
- **Save**

#### 3.7. Event - External Link Click
- **Name**: `Event - External Link Click`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `external_link_click`
- **Event Parameters**:
  - **Parameter Name**: `link_url` | **Value**: `{{Click URL}}`
  - **Parameter Name**: `link_domain` | **Value**: `{{Link Domain}}`
  - **Parameter Name**: `link_text` | **Value**: `{{Click Text}}`
  - **Parameter Name**: `link_type` | **Value**: `{{Link Type}}`
- **Triggering**: `Click - External Links`
- **Save**

#### 3.8. Event - Scroll Depth
- **Name**: `Event - Scroll Depth`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `scroll_depth`
- **Event Parameters**:
  - **Parameter Name**: `scroll_percentage` | **Value**: `{{Scroll Depth Threshold}}`
  - **Parameter Name**: `page_path` | **Value**: `{{Page Path}}`
- **Triggering**: `Scroll Depth - 25, 50, 75, 90`
- **Save**

#### 3.9. Event - Guide Start
- **Name**: `Event - Guide Start`
- **Tag Type**: **Google Analytics: GA4 Event**
- **Configuration Tag**: `{{GA4 - Configuration}}`
- **Event Name**: `guide_start`
- **Event Parameters**:
  - **Parameter Name**: `guide_type` | **Value**: Use custom JS to extract from URL
  - **Parameter Name**: `referrer` | **Value**: `{{Referrer}}`
- **Triggering**: `Pageview - Getting Started`
- **Save**

---

### 🎯 KROK 4: Test & Publish (2 minuty)

1. **Preview** (prawy górny róg)
2. Wpisz: `https://arkiv.network`
3. **Connect**
4. **Testuj eventy**:
   - Kliknij "Build now"
   - Kliknij "Litepaper"
   - W playground: Run, Copy, Connect wallet
   - Scroll 25%, 50%, 75%
5. **Submit** → **Publish**

---

## ✅ Gotowe eventy w kodzie

Te eventy są już zaimplementowane i wysyłają dane do dataLayer:

```typescript
// 1. Wallet Connected
window.dataLayer.push({
  event: 'walletConnected',
  wallet_type: 'MetaMask',
  network: 'Arkiv ETHWarsaw Testnet',
  page_path: window.location.pathname
});

// 2. Code Executed
window.dataLayer.push({
  event: 'codeExecuted',
  language: 'typescript' | 'python',
  code_type: 'example' | 'custom',
  execution_status: 'success' | 'error',
  page_path: window.location.pathname
});

// 3. Code Copied
window.dataLayer.push({
  event: 'codeCopied',
  language: 'typescript' | 'python',
  code_snippet_type: 'playground',
  page_path: window.location.pathname
});
```

---

## 🔍 Jak sprawdzić że działa

### W konsoli (F12):
```javascript
console.log(window.dataLayer) // Array z eventami
console.log(window.gtag) // function
```

### W GA4:
https://analytics.google.com → Realtime → Zobacz eventy na żywo

---

**Czas:** ~15 minut
**Status:** Production Ready
**GA4:** G-T51L4JTDZV
**GTM:** GTM-KW755WH8
