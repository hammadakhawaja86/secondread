/* @ds-bundle: {"format":3,"namespace":"Ds31GDesignSystem_5eefac","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ServiceCard","sourcePath":"components/core/ServiceCard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"49bd9fe41ce7","components/core/Badge.jsx":"144ef01e7b5a","components/core/Button.jsx":"2503952dd4d2","components/core/Card.jsx":"f7670284128e","components/core/Icon.jsx":"14b0f2a9b80b","components/core/ServiceCard.jsx":"f853b31f070e","components/forms/Checkbox.jsx":"8d413562c1f6","components/forms/Input.jsx":"1491725c1006","components/forms/Select.jsx":"7413dfec9a0f","components/navigation/Tabs.jsx":"5ac5bd10cbf2","ui_kits/website/CaseStudiesPage.jsx":"9a38ec51ddd2","ui_kits/website/CompanyPage.jsx":"fe8eb3a78a39","ui_kits/website/ContactPage.jsx":"07b251ac5ac9","ui_kits/website/Footer.jsx":"620846a22fb8","ui_kits/website/Header.jsx":"92bbe7e1d520","ui_kits/website/HomePage.jsx":"ffd895883156","ui_kits/website/ServicePage.jsx":"3275e655a564","ui_kits/website/blocks.jsx":"27a15b3ed11e","ui_kits/website/nav.js":"8e4ad48d868f","ui_kits/website/pages.js":"84d56823b349"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds31GDesignSystem_5eefac = window.Ds31GDesignSystem_5eefac || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 31G avatar — image or initials on a brand-tinted disc. */
function Avatar({
  src,
  name = '',
  size = 40,
  style = {},
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: src ? 'transparent' : 'var(--gradient-brand)',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: Math.round(size * 0.4),
      border: '2px solid var(--white)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 31G Badge / pill — used for service chips, statuses, tags. */
function Badge({
  variant = 'green',
  size = 'md',
  children,
  style = {},
  ...rest
}) {
  const variants = {
    green: {
      background: 'var(--green-50)',
      color: 'var(--green-600)',
      border: '1px solid var(--green-100)'
    },
    navy: {
      background: 'rgba(22,48,77,0.06)',
      color: 'var(--navy-700)',
      border: '1px solid rgba(22,48,77,0.12)'
    },
    solid: {
      background: 'var(--green-500)',
      color: '#fff',
      border: '1px solid transparent'
    },
    neutral: {
      background: 'var(--line-100)',
      color: 'var(--ink-700)',
      border: '1px solid var(--line-200)'
    },
    success: {
      background: 'var(--green-50)',
      color: 'var(--green-600)',
      border: '1px solid var(--green-100)'
    },
    warning: {
      background: '#FBF1DD',
      color: '#9A6B12',
      border: '1px solid #F3E1BC'
    },
    danger: {
      background: '#FBE6E4',
      color: '#A8362C',
      border: '1px solid #F3CBC6'
    }
  };
  const sizes = {
    sm: {
      padding: '3px 10px',
      fontSize: 'var(--text-xs)'
    },
    md: {
      padding: '5px 14px',
      fontSize: 'var(--text-sm)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 31G Button — primary action uses brand green; dark uses navy; secondary is
 * outlined; ghost is text-only. Pill-rounded to echo the logo geometry.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)',
      gap: '6px'
    },
    md: {
      padding: '12px 24px',
      fontSize: 'var(--text-base)',
      gap: '8px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: 'var(--text-md)',
      gap: '10px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-green)'
    },
    dark: {
      background: 'var(--action-dark)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-sm)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--navy-700)',
      border: '1.5px solid var(--navy-700)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--green-600)',
      border: '1px solid transparent'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    letterSpacing: '0.005em',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 31G surface card — soft cool shadow, generous rounding, optional hover lift. */
function Card({
  padding = 'var(--space-6)',
  interactive = false,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: e => {
      if (interactive) {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }
    },
    onMouseLeave: e => {
      if (interactive) {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }
    },
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--line-100)',
      boxShadow: 'var(--shadow-sm)',
      padding,
      transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
/**
 * 31G Icon — thin wrapper over Lucide (https://lucide.dev), a clean ~2px stroke
 * line-icon set used as the substitute for 31G's bespoke SVG glyphs (not
 * publicly available). Load the Lucide UMD script on the page; this looks up
 * the named icon and renders an inline SVG.
 */
function Icon({
  name = 'Circle',
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const L = typeof window !== 'undefined' && window.lucide;
    if (!L || !ref.current) return;
    const icons = L.icons || L.default && L.default.icons;
    const node = icons && (icons[name] || icons[name.charAt(0).toUpperCase() + name.slice(1)]);
    if (!node) return;
    if (typeof L.createElement === 'function') {
      ref.current.innerHTML = '';
      ref.current.appendChild(L.createElement(node));
    }
  }, [name]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      strokeWidth,
      lineHeight: 0,
      ...style
    },
    "data-icon": name
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 31G service / value card — circular green icon medallion, title, supporting copy.
 * Mirrors the "Our values" and "What we do" blocks on 31g.co.uk.
 */
function ServiceCard({
  icon,
  title,
  children,
  align = 'left',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    interactive: true,
    padding: "var(--space-8)",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-md)',
      background: 'var(--gradient-brand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 26,
      boxShadow: 'var(--shadow-green)'
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-lg)',
      color: 'var(--navy-700)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--ink-700)'
    }
  }, children));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 31G checkbox with brand-green checked fill. */
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const cid = id || (label ? 'cb-' + String(label).replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--ink-700)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-xs)',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--green-500)' : 'var(--white)',
      border: '1.5px solid ' + (checked ? 'var(--green-500)' : 'var(--line-200)'),
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L5 8.7L9.5 3.5",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", _extends({
    id: cid,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** 31G text input — soft border, green focus ring. Supports label, hint, error, icon. */
function Input({
  label,
  hint,
  error,
  iconLeft,
  type = 'text',
  id,
  fullWidth = true,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      color: 'var(--ink-400)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--ink-900)',
      padding: iconLeft ? '12px 16px 12px 42px' : '12px 16px',
      background: 'var(--white)',
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid ' + (error ? 'var(--color-danger)' : focus ? 'var(--green-500)' : 'var(--line-200)'),
      boxShadow: focus && !error ? 'var(--ring)' : 'none',
      outline: 'none',
      transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)',
      ...style
    }
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--ink-500)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** 31G native select, styled to match Input with a chevron. */
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  id,
  fullWidth = true,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const selId = id || (label ? 'sel-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    defaultValue: "",
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      appearance: 'none',
      WebkitAppearance: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--ink-900)',
      padding: '12px 40px 12px 16px',
      background: 'var(--white)',
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid ' + (error ? 'var(--color-danger)' : focus ? 'var(--green-500)' : 'var(--line-200)'),
      boxShadow: focus && !error ? 'var(--ring)' : 'none',
      outline: 'none',
      cursor: 'pointer',
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--ink-500)'
    }
  }, "\u25BE")), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--ink-500)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** 31G tabs — underline indicator in brand green. Controlled via value/onChange. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: '1px solid var(--line-200)',
      ...style
    }
  }, tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(v),
      style: {
        appearance: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        color: active ? 'var(--navy-700)' : 'var(--ink-500)',
        padding: '12px 2px',
        marginBottom: -1,
        borderBottom: '2.5px solid ' + (active ? 'var(--green-500)' : 'transparent'),
        transition: 'color var(--duration-fast), border-color var(--duration-fast)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CaseStudiesPage.jsx
try { (() => {
// Case Studies — six client cards + summary + FAQ.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  const SECTOR_ICON = {
    'Fintech': 'Landmark',
    'PropTech': 'Building',
    'Healthcare': 'HeartPulse'
  };
  function CaseStudiesPage({
    onNavigate
  }) {
    const {
      Blocks
    } = window;
    const {
      Card,
      Icon,
      Button,
      Badge
    } = DS();
    const page = window.PAGES['case-studies'];
    const C = Blocks.CONTAINER;
    React.useEffect(() => {
      document.title = page.meta.title;
    }, []);
    const cases = page.sections.slice(0, 6);
    const summary = page.sections[6];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--gradient-brand-soft)',
        borderBottom: '1px solid var(--line-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 48,
        paddingBottom: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(Blocks.Breadcrumb, {
      trail: [{
        label: 'Home',
        slug: 'home'
      }, {
        label: 'Case Studies'
      }],
      onNavigate: onNavigate
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 760
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "green",
      size: "md"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Trophy",
      size: 14,
      color: "var(--green-600)"
    }), " ", page.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '18px 0 16px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-4xl)',
        lineHeight: 1.07,
        letterSpacing: '-0.02em',
        color: 'var(--navy-700)'
      }
    }, page.h1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-md)',
        lineHeight: 1.65,
        color: 'var(--ink-700)'
      }
    }, page.intro)))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 64,
        paddingBottom: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: 24
      }
    }, cases.map((s, i) => {
      const [client, sector] = s.title.split(' · ');
      return /*#__PURE__*/React.createElement(Card, {
        key: i,
        padding: "var(--space-8)",
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 46,
          height: 46,
          borderRadius: 'var(--radius-md)',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: SECTOR_ICON[sector] || 'Briefcase',
        size: 22,
        color: "#fff"
      })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-lg)',
          color: 'var(--navy-700)'
        }
      }, client), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--green-600)'
        }
      }, sector)))), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 'var(--text-base)',
          lineHeight: 1.6,
          color: 'var(--ink-700)'
        }
      }, s.lead), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8
        }
      }, s.bullets.map((b, j) => /*#__PURE__*/React.createElement("span", {
        key: j,
        style: {
          padding: '5px 12px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--green-50)',
          color: 'var(--green-600)',
          fontSize: 13,
          fontWeight: 500
        }
      }, b))), s.stat && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 'auto',
          paddingTop: 16,
          borderTop: '1px solid var(--line-100)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-2xl)',
          color: 'var(--navy-700)'
        }
      }, s.stat.value), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--ink-500)'
        }
      }, s.stat.label)));
    })))), summary && /*#__PURE__*/React.createElement(Blocks.Section, {
      section: summary,
      index: 1
    }), /*#__PURE__*/React.createElement(Blocks.FAQ, {
      faqs: page.faqs
    }), /*#__PURE__*/React.createElement(Blocks.CTABand, {
      cta: page.cta,
      onNavigate: onNavigate,
      label: "Request a reference call"
    }));
  }
  window.CaseStudiesPage = CaseStudiesPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CaseStudiesPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CompanyPage.jsx
try { (() => {
// Company / About — leadership founders, offices, behaviour + FAQ.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  function ContactBlurb() {
    return null;
  }
  function CompanyPage({
    onNavigate
  }) {
    const {
      Blocks
    } = window;
    const {
      Card,
      Icon,
      Button,
      Badge,
      Avatar
    } = DS();
    const page = window.PAGES['about'];
    const C = Blocks.CONTAINER;
    React.useEffect(() => {
      document.title = page.meta.title;
    }, []);
    const leadership = page.sections[0];
    const offices = page.sections[1];
    const behaviour = page.sections[2];
    const founders = leadership.bullets.map(b => {
      const i = b.indexOf(': ');
      const name = b.slice(0, i);
      const rest = b.slice(i + 2);
      const c = name.indexOf(', ');
      return {
        name: name.slice(0, c),
        role: name.slice(c + 2),
        bio: rest
      };
    });
    const officeData = offices.bullets.map(b => {
      const i = b.indexOf(': ');
      return {
        city: b.slice(0, i),
        desc: b.slice(i + 2)
      };
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--gradient-brand-soft)',
        borderBottom: '1px solid var(--line-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 48,
        paddingBottom: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(Blocks.Breadcrumb, {
      trail: [{
        label: 'Home',
        slug: 'home'
      }, {
        label: 'Company'
      }],
      onNavigate: onNavigate
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 780
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "green",
      size: "md"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Compass",
      size: 14,
      color: "var(--green-600)"
    }), " ", page.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '18px 0 16px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-4xl)',
        lineHeight: 1.07,
        letterSpacing: '-0.02em',
        color: 'var(--navy-700)'
      }
    }, page.h1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-md)',
        lineHeight: 1.65,
        color: 'var(--ink-700)'
      }
    }, page.intro)))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 10
      }
    }, "Leadership"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, "Founders who stay hands-on"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '12px 0 0',
        fontSize: 'var(--text-md)',
        color: 'var(--ink-500)',
        maxWidth: 640
      }
    }, leadership.lead)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: 24
      }
    }, founders.map((f, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: "var(--space-8)",
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: f.name,
      size: 64
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-lg)',
        color: 'var(--navy-700)'
      }
    }, f.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 12
      }
    }, f.role), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-base)',
        lineHeight: 1.6,
        color: 'var(--ink-700)'
      }
    }, f.bio))))))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--paper-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 32,
        textAlign: 'center',
        maxWidth: 640,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 10
      }
    }, "Our offices"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, offices.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '12px 0 0',
        fontSize: 'var(--text-md)',
        color: 'var(--ink-500)'
      }
    }, offices.lead)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 22
      }
    }, officeData.map((o, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: "var(--space-6)",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-md)',
        background: 'var(--gradient-brand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "MapPin",
      size: 20,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-md)',
        color: 'var(--navy-700)'
      }
    }, o.city), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-sm)',
        lineHeight: 1.55,
        color: 'var(--ink-500)'
      }
    }, o.desc)))))), /*#__PURE__*/React.createElement(Blocks.Section, {
      section: behaviour,
      index: 0
    }), /*#__PURE__*/React.createElement(Blocks.FAQ, {
      faqs: page.faqs
    }), /*#__PURE__*/React.createElement(Blocks.CTABand, {
      cta: page.cta,
      onNavigate: onNavigate,
      label: "Get in touch"
    }));
  }
  window.CompanyPage = CompanyPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CompanyPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactPage.jsx
try { (() => {
// Contact — hero, booking form, contact methods, what happens next + FAQ.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  function ContactPage({
    onNavigate
  }) {
    const {
      Blocks
    } = window;
    const {
      Input,
      Select,
      Button,
      Icon,
      Card,
      Badge
    } = DS();
    const page = window.PAGES['contact'];
    const C = Blocks.CONTAINER;
    const [sent, setSent] = React.useState(false);
    React.useEffect(() => {
      document.title = page.meta.title;
    }, []);
    const reach = page.sections[0];
    const next = page.sections[1];
    const help = page.sections[2];
    const methodIcon = {
      'Phone': 'Phone',
      'Email': 'Mail',
      'LinkedIn': 'Linkedin'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--gradient-brand-soft)',
        borderBottom: '1px solid var(--line-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 48,
        paddingBottom: 56
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(Blocks.Breadcrumb, {
      trail: [{
        label: 'Home',
        slug: 'home'
      }, {
        label: 'Contact'
      }],
      onNavigate: onNavigate
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 760
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "green",
      size: "md"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Mail",
      size: 14,
      color: "var(--green-600)"
    }), " ", page.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: '18px 0 16px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-4xl)',
        lineHeight: 1.07,
        letterSpacing: '-0.02em',
        color: 'var(--navy-700)'
      }
    }, page.h1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-md)',
        lineHeight: 1.65,
        color: 'var(--ink-700)'
      }
    }, page.intro)))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 64,
        paddingBottom: 64,
        display: 'grid',
        gridTemplateColumns: '0.95fr 1.05fr',
        gap: 48,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '0 0 8px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-xl)',
        color: 'var(--navy-700)'
      }
    }, reach.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 18px',
        fontSize: 'var(--text-base)',
        lineHeight: 1.55,
        color: 'var(--ink-500)'
      }
    }, reach.lead), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, reach.bullets.map((b, i) => {
      const c = b.indexOf(': ');
      const k = b.slice(0, c);
      const v = b.slice(c + 2);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'var(--ink-700)',
          fontSize: 'var(--text-base)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'var(--green-50)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: methodIcon[k] || 'Dot',
        size: 18,
        color: "var(--green-600)"
      })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: 'var(--navy-700)'
        }
      }, k, ":"), " ", v));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-50)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--line-100)',
        padding: '24px 26px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '0 0 6px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-md)',
        color: 'var(--navy-700)'
      }
    }, next.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 16px',
        fontSize: 'var(--text-sm)',
        color: 'var(--ink-500)'
      }
    }, next.lead), /*#__PURE__*/React.createElement("ol", {
      style: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, next.bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'var(--navy-700)',
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        lineHeight: 1.5,
        color: 'var(--ink-700)'
      }
    }, b)))))), /*#__PURE__*/React.createElement(Card, {
      padding: "var(--space-8)"
    }, sent ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        padding: '40px 8px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'var(--green-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 30,
      color: "var(--green-600)"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-xl)',
        color: 'var(--navy-700)'
      }
    }, "Thank you"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'var(--ink-500)',
        maxWidth: 380
      }
    }, "A founder or senior lead will come back to you within one working day."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setSent(false)
    }, "Send another")) : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-xl)',
        color: 'var(--navy-700)'
      }
    }, "Request a quote")), /*#__PURE__*/React.createElement(Input, {
      label: "Full name",
      placeholder: "Jane Doe",
      required: true
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Work email",
      type: "email",
      placeholder: "you@company.com",
      required: true
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Company",
      placeholder: "Company Ltd"
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Rough budget",
      placeholder: "Select\u2026",
      options: ['Under £25k', '£25k–£75k', '£75k–£200k', '£200k+', 'Not sure yet']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "What can we help with?",
      placeholder: "Select a discipline\u2026",
      options: ['Bespoke software / AI & automation', 'SaaS or MVP build', 'NHS & healthcare technology', 'Cloud & DevOps', 'Outsourced HR / finance / support', 'Outsourced digital marketing', 'Back office outsourcing']
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'var(--navy-700)',
        fontFamily: 'var(--font-body)'
      }
    }, "The outcome you want, and your deadline"), /*#__PURE__*/React.createElement("textarea", {
      rows: 3,
      placeholder: "A few lines about the problem, a rough budget and when you need it\u2026",
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        padding: '12px 16px',
        borderRadius: 'var(--radius-sm)',
        border: '1.5px solid var(--line-200)',
        resize: 'vertical',
        outline: 'none'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      size: "lg",
      fullWidth: true
    }, "Send \u2014 reply within one working day")))))), /*#__PURE__*/React.createElement(Blocks.FAQ, {
      faqs: page.faqs
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--navy-700)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 36,
        paddingBottom: 36,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 'var(--text-sm)'
      }
    }, page.cta))));
  }
  window.ContactPage = ContactPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// 31G site footer — navy field with full sitemap columns and office HQs.
function Footer({
  onNavigate
}) {
  const {
    Icon
  } = window.Ds31GDesignSystem_5eefac;
  const NAV = window.NAV,
    P = window.PAGES;
  const name = s => window.PAGE_SHORT[s] || (P[s] ? P[s].name : s);
  const lk = {
    color: 'rgba(255,255,255,0.66)',
    fontSize: 'var(--text-sm)',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: 1.9,
    display: 'block'
  };
  const h = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: '#fff',
    margin: '0 0 10px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  };
  const cols = NAV.filter(n => n.children); // hubs become columns
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-800)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 32px 32px',
      display: 'grid',
      gridTemplateColumns: '1.5fr repeat(3, 1fr)',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "../../assets/logo-full.png",
    alt: "31G",
    style: {
      height: 52,
      filter: 'brightness(0) invert(1)',
      opacity: 0.96,
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,0.66)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      maxWidth: 300,
      margin: 0
    }
  }, "The cost-effective, AI-powered digital transformation partner for UK business."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 4,
      color: 'rgba(255,255,255,0.72)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      display: 'block',
      fontSize: 12
    }
  }, "Europe HQ"), "Sheffield, UK"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      display: 'block',
      fontSize: 12
    }
  }, "Middle East"), "Dubai, UAE"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      display: 'block',
      fontSize: 12
    }
  }, "Asia"), "Islamabad, PK")), /*#__PURE__*/React.createElement("span", {
    onClick: () => onNavigate('contact'),
    style: {
      display: 'inline-flex',
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Linkedin",
    size: 18,
    color: "#fff"
  }))), cols.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.slug
  }, /*#__PURE__*/React.createElement("h4", {
    style: h
  }, col.label), /*#__PURE__*/React.createElement("a", {
    style: lk,
    onClick: () => onNavigate(col.slug)
  }, "Overview"), col.children.map(cs => /*#__PURE__*/React.createElement("a", {
    key: cs,
    style: lk,
    onClick: () => onNavigate(cs)
  }, name(cs)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '18px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      color: 'rgba(255,255,255,0.5)',
      fontSize: 'var(--text-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 31 Green Limited. Registered in England, company no. 14019513."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'rgba(255,255,255,0.5)',
      cursor: 'pointer'
    },
    onClick: () => onNavigate('about')
  }, "Company"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'rgba(255,255,255,0.5)',
      cursor: 'pointer'
    },
    onClick: () => onNavigate('contact')
  }, "Contact"), /*#__PURE__*/React.createElement("span", null, "info@31g.co.uk \xB7 +44 20 3290 0012")))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// 31G site header — sticky nav with hub dropdowns and primary CTA.
function Header({
  route,
  onNavigate
}) {
  const {
    Button,
    Icon
  } = window.Ds31GDesignSystem_5eefac;
  const NAV = window.NAV,
    P = window.PAGES;
  const [open, setOpen] = React.useState(null);
  const name = s => window.PAGE_SHORT[s] || (P[s] ? P[s].name : s);
  const isActive = top => route === top.slug || top.children && top.children.includes(route);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--line-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate('home'),
    style: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "../../assets/logo-full.png",
    alt: "31G \u2014 Your Technology Partner",
    style: {
      height: 44
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 'auto',
      alignItems: 'center'
    }
  }, NAV.map(top => {
    const active = isActive(top);
    const hasKids = !!top.children;
    return /*#__PURE__*/React.createElement("div", {
      key: top.slug,
      style: {
        position: 'relative'
      },
      onMouseEnter: () => hasKids && setOpen(top.slug),
      onMouseLeave: () => hasKids && setOpen(null)
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate(top.slug),
      style: {
        appearance: 'none',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        color: active ? 'var(--green-600)' : 'var(--navy-700)'
      }
    }, top.label, hasKids && /*#__PURE__*/React.createElement(Icon, {
      name: "ChevronDown",
      size: 14,
      color: active ? 'var(--green-600)' : 'var(--ink-400)'
    })), hasKids && open === top.slug && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '100%',
        left: 0,
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--line-100)',
        boxShadow: 'var(--shadow-lg)',
        padding: 8,
        minWidth: 280,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, top.children.map(cs => /*#__PURE__*/React.createElement("button", {
      key: cs,
      onClick: () => {
        onNavigate(cs);
        setOpen(null);
      },
      style: {
        appearance: 'none',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        color: route === cs ? 'var(--green-600)' : 'var(--navy-700)'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--green-50)',
      onMouseLeave: e => e.currentTarget.style.background = 'none'
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        background: 'var(--green-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: window.PAGE_ICON[cs] || 'Circle',
      size: 17,
      color: "var(--green-600)"
    })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'var(--text-sm)'
      }
    }, name(cs)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 11,
        color: 'var(--ink-400)'
      }
    }, P[cs] && P[cs].meta.primary)))))));
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNavigate('contact'),
    style: {
      flexShrink: 0
    }
  }, "Get a quote")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
// Home page — custom layout over the home data.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  function splitBullet(b) {
    const i = b.indexOf(': ');
    return i > 0 ? {
      head: b.slice(0, i),
      body: b.slice(i + 2)
    } : {
      head: '',
      body: b
    };
  }
  function HomePage({
    onNavigate
  }) {
    const {
      Blocks
    } = window;
    const {
      Button,
      Badge,
      Card,
      Icon
    } = DS();
    const page = window.PAGES['home'];
    const C = Blocks.CONTAINER;
    React.useEffect(() => {
      document.title = page.meta.title;
    }, []);
    const caps = page.sections[3];
    const stories = page.sections[4];
    const heroStats = [{
      value: '30–40%',
      label: 'below typical UK agency rates'
    }, {
      value: '20+ yrs',
      label: 'regulated delivery experience'
    }, {
      value: '100+',
      label: 'specialists in our own teams'
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--gradient-brand-soft)',
        borderBottom: '1px solid var(--line-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 72,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        gap: 56,
        alignItems: 'center',
        paddingBottom: 56
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "green",
      size: "md"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Sparkles",
      size: 14,
      color: "var(--green-600)"
    }), " ", page.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-5xl)',
        lineHeight: 1.04,
        letterSpacing: '-0.025em',
        color: 'var(--navy-700)'
      }
    }, page.h1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-lg)',
        lineHeight: 1.6,
        color: 'var(--ink-700)',
        maxWidth: 560
      }
    }, page.intro), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate('contact')
    }, "Get a quote"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
      onClick: () => onNavigate('case-studies')
    }, "See the work"))), /*#__PURE__*/React.createElement(Blocks.HeroVisual, {
      icon: "Sparkles",
      primary: page.meta.primary
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 1,
        background: 'var(--line-200)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        overflow: 'hidden',
        border: '1px solid var(--line-200)',
        borderBottom: 'none'
      }
    }, heroStats.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--white)',
        padding: '26px 28px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--green-600)',
        lineHeight: 1
      }
    }, s.value), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 'var(--text-sm)',
        color: 'var(--ink-500)'
      }
    }, s.label)))))), [0, 1, 2].map(idx => /*#__PURE__*/React.createElement(Blocks.Section, {
      key: idx,
      section: page.sections[idx],
      index: idx
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--paper-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 640,
        margin: '0 auto 40px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 12
      }
    }, "Capabilities"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, "Four disciplines, one accountable partner"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '14px 0 0',
        fontSize: 'var(--text-md)',
        color: 'var(--ink-500)'
      }
    }, caps.lead)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 22
      }
    }, caps.bullets.map((b, i) => {
      const {
        head,
        body
      } = splitBullet(b);
      const targets = {
        'AI & Automation': 'ai-automation',
        'Software Development': 'software-development',
        'NHS & Healthcare Tech': 'nhs-healthcare-technology',
        'BPO & Workforce': 'bpo-services',
        'Digital Marketing': 'digital-marketing-services'
      };
      const icons = {
        'AI & Automation': 'BrainCircuit',
        'Software Development': 'Code2',
        'NHS & Healthcare Tech': 'HeartPulse',
        'BPO & Workforce': 'Users',
        'Digital Marketing': 'Megaphone'
      };
      const t = targets[head];
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        onClick: () => t && onNavigate(t),
        style: {
          cursor: t ? 'pointer' : 'default'
        }
      }, /*#__PURE__*/React.createElement(Card, {
        interactive: !!t,
        padding: "var(--space-6)",
        style: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 46,
          height: 46,
          borderRadius: 'var(--radius-md)',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: icons[head] || 'Circle',
        size: 22,
        color: "#fff"
      })), /*#__PURE__*/React.createElement("h3", {
        style: {
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-md)',
          color: 'var(--navy-700)'
        }
      }, head), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 'var(--text-sm)',
          lineHeight: 1.55,
          color: 'var(--ink-500)'
        }
      }, body)));
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...C,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 24,
        marginBottom: 36,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 12
      }
    }, "Success stories"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, "Real engagements, real numbers")), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "ArrowRight",
        size: 16,
        color: "var(--green-600)"
      }),
      onClick: () => onNavigate('case-studies')
    }, "All case studies")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20
      }
    }, stories.bullets.map((b, i) => {
      const {
        head,
        body
      } = splitBullet(b);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        onClick: () => onNavigate('case-studies'),
        style: {
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement(Card, {
        interactive: true,
        padding: "var(--space-6)",
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--green-500)'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-md)',
          color: 'var(--navy-700)'
        }
      }, head)), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 'var(--text-sm)',
          lineHeight: 1.55,
          color: 'var(--ink-500)'
        }
      }, body)));
    })))), /*#__PURE__*/React.createElement(Blocks.FAQ, {
      faqs: page.faqs
    }), /*#__PURE__*/React.createElement(Blocks.CTABand, {
      cta: page.cta,
      onNavigate: onNavigate
    }));
  }
  window.HomePage = HomePage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicePage.jsx
try { (() => {
// Generic page template — services, hubs and industry pages render from data.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  function trailFor(slug) {
    const NAV = window.NAV,
      P = window.PAGES;
    const name = s => window.PAGE_SHORT[s] || P[s].name;
    for (const top of NAV) {
      if (top.slug === slug) return [{
        label: 'Home',
        slug: 'home'
      }, {
        label: name(slug)
      }];
      if (top.children && top.children.includes(slug)) return [{
        label: 'Home',
        slug: 'home'
      }, {
        label: name(top.slug),
        slug: top.slug
      }, {
        label: name(slug)
      }];
    }
    return [{
      label: 'Home',
      slug: 'home'
    }, {
      label: name(slug)
    }];
  }
  function childrenOf(slug) {
    const top = window.NAV.find(n => n.slug === slug);
    return top && top.children ? top.children : null;
  }
  function ServicePage({
    slug,
    onNavigate
  }) {
    const {
      Blocks
    } = window;
    const page = window.PAGES[slug];
    const kids = childrenOf(slug);
    React.useEffect(() => {
      document.title = page.meta.title;
    }, [slug]);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Blocks.Hero, {
      page: page,
      trail: trailFor(slug),
      onNavigate: onNavigate
    }), kids && /*#__PURE__*/React.createElement(Blocks.ChildCards, {
      title: `Inside ${window.PAGE_SHORT[slug] || page.name}`,
      lead: null,
      slugs: kids,
      onNavigate: onNavigate
    }), page.sections.map((s, i) => /*#__PURE__*/React.createElement(Blocks.Section, {
      key: i,
      section: s,
      index: i
    })), /*#__PURE__*/React.createElement(Blocks.FAQ, {
      faqs: page.faqs
    }), /*#__PURE__*/React.createElement(Blocks.CTABand, {
      cta: page.cta,
      onNavigate: onNavigate
    }));
  }
  window.ServicePage = ServicePage;
  window.navHelpers = {
    trailFor,
    childrenOf
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/blocks.jsx
try { (() => {
// 31G site building blocks — shared layout pieces used across page templates.
// All visual primitives come from the design-system bundle.
(function () {
  const DS = () => window.Ds31GDesignSystem_5eefac;
  const CONTAINER = {
    maxWidth: 'var(--container-max)',
    margin: '0 auto',
    padding: '0 32px'
  };

  // ---- Breadcrumb ----
  function Breadcrumb({
    trail,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: 13,
        color: 'var(--ink-500)'
      }
    }, trail.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-300)'
      }
    }, "/"), t.slug ? /*#__PURE__*/React.createElement("a", {
      onClick: () => onNavigate(t.slug),
      style: {
        cursor: 'pointer',
        color: 'var(--green-600)',
        fontWeight: 500
      }
    }, t.label) : /*#__PURE__*/React.createElement("span", null, t.label))));
  }

  // ---- Hero ----
  function Hero({
    page,
    trail,
    onNavigate,
    ctaLabel = 'Get a quote'
  }) {
    const {
      Button,
      Badge,
      Icon
    } = DS();
    const icon = window.PAGE_ICON[page.slug] || 'Sparkles';
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--gradient-brand-soft)',
        borderBottom: '1px solid var(--line-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...CONTAINER,
        paddingTop: 48,
        paddingBottom: 72
      }
    }, trail && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement(Breadcrumb, {
      trail: trail,
      onNavigate: onNavigate
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 56,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "green",
      size: "md"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 14,
      color: "var(--green-600)"
    }), " ", page.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-4xl)',
        lineHeight: 1.07,
        letterSpacing: '-0.02em',
        color: 'var(--navy-700)'
      }
    }, page.h1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-md)',
        lineHeight: 1.65,
        color: 'var(--ink-700)',
        maxWidth: 560
      }
    }, page.intro), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate('contact')
    }, ctaLabel), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
      onClick: () => onNavigate('case-studies')
    }, "See the work"))), /*#__PURE__*/React.createElement(HeroVisual, {
      icon: icon,
      primary: page.meta.primary
    }))));
  }
  function HeroVisual({
    icon,
    primary
  }) {
    const {
      Icon
    } = DS();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '1/0.82',
        borderRadius: 'var(--radius-2xl)',
        background: 'var(--gradient-brand)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        opacity: 0.14,
        backgroundImage: 'radial-gradient(circle at 78% 22%, #fff 0, transparent 40%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderTop: '90px solid transparent',
        borderBottom: '90px solid transparent',
        borderLeft: '150px solid rgba(255,255,255,0.16)',
        left: '30%',
        top: '18%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 24,
        bottom: 24,
        right: 24,
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 11,
        background: 'var(--gradient-brand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 22,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        color: 'var(--ink-400)',
        textTransform: 'uppercase'
      }
    }, "Primary focus"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 15,
        color: 'var(--navy-700)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, primary))));
  }

  // ---- Bulleted section with optional stat callout ----
  function Section({
    section,
    index
  }) {
    const {
      Icon
    } = DS();
    const flip = index % 2 === 1;
    const hasStat = !!section.stat;
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: index % 2 === 0 ? 'var(--white)' : 'var(--paper-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...CONTAINER,
        paddingTop: 64,
        paddingBottom: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: hasStat ? '1.5fr 1fr' : '1fr',
        gap: 48,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        order: flip && hasStat ? 2 : 1
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '0 0 12px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-2xl)',
        color: 'var(--navy-700)',
        letterSpacing: '-0.01em'
      }
    }, section.title), section.lead && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 24px',
        fontSize: 'var(--text-md)',
        lineHeight: 1.6,
        color: 'var(--ink-700)',
        maxWidth: 620
      }
    }, section.lead), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, section.bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'var(--green-50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 14,
      color: "var(--green-600)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-base)',
        lineHeight: 1.55,
        color: 'var(--ink-700)'
      }
    }, b))))), hasStat && /*#__PURE__*/React.createElement(StatCallout, {
      stat: section.stat,
      order: flip ? 1 : 2
    }))));
  }
  function StatCallout({
    stat,
    order
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        order,
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--navy-700)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px 36px',
        boxShadow: 'var(--shadow-md)',
        width: '100%',
        maxWidth: 340,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: 'var(--gradient-brand)',
        opacity: 0.32
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-5xl)',
        lineHeight: 1,
        color: '#fff',
        letterSpacing: '-0.02em'
      }
    }, stat.value), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        fontSize: 'var(--text-base)',
        lineHeight: 1.5,
        color: 'rgba(255,255,255,0.78)'
      }
    }, stat.label))));
  }

  // ---- Child page cards (for hubs) ----
  function ChildCards({
    title,
    lead,
    slugs,
    onNavigate
  }) {
    const {
      Card,
      Icon
    } = DS();
    const P = window.PAGES;
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--white)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...CONTAINER,
        paddingTop: 72,
        paddingBottom: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 640,
        margin: '0 auto 44px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 12
      }
    }, "Explore"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, title), lead && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '14px 0 0',
        fontSize: 'var(--text-md)',
        color: 'var(--ink-500)'
      }
    }, lead)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 22
      }
    }, slugs.map(slug => {
      const pg = P[slug];
      if (!pg) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: slug,
        onClick: () => onNavigate(slug),
        style: {
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement(Card, {
        interactive: true,
        padding: "var(--space-6)",
        style: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-md)',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: window.PAGE_ICON[slug] || 'Circle',
        size: 24,
        color: "#fff"
      })), /*#__PURE__*/React.createElement("h3", {
        style: {
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-lg)',
          color: 'var(--navy-700)'
        }
      }, window.PAGE_SHORT[slug] || pg.name), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 'var(--text-sm)',
          lineHeight: 1.55,
          color: 'var(--ink-500)',
          flex: 1
        }
      }, pg.h1), /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--green-600)'
        }
      }, "Learn more ", /*#__PURE__*/React.createElement(Icon, {
        name: "ArrowRight",
        size: 15,
        color: "var(--green-600)"
      }))));
    }))));
  }

  // ---- FAQ accordion ----
  function FAQ({
    faqs
  }) {
    const {
      Icon
    } = DS();
    const [open, setOpen] = React.useState(0);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--paper-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 860,
        margin: '0 auto',
        padding: '72px 32px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 36
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--green-600)',
        marginBottom: 10
      }
    }, "FAQs"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        color: 'var(--navy-700)'
      }
    }, "Questions, answered straight")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, faqs.map((f, i) => {
      const isOpen = open === i;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: 'var(--white)',
          border: '1px solid var(--line-100)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xs)',
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setOpen(isOpen ? -1 : i),
        style: {
          width: '100%',
          appearance: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 22px',
          textAlign: 'left'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'var(--text-md)',
          color: 'var(--navy-700)'
        }
      }, f.q), /*#__PURE__*/React.createElement("span", {
        style: {
          flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'none',
          transition: 'transform var(--duration-base) var(--ease-standard)',
          color: 'var(--green-600)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "Plus",
        size: 20,
        color: "var(--green-600)"
      }))), isOpen && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: '0 22px 22px',
          fontSize: 'var(--text-base)',
          lineHeight: 1.65,
          color: 'var(--ink-700)'
        }
      }, f.a));
    }))));
  }

  // ---- CTA band ----
  function CTABand({
    cta,
    onNavigate,
    label = 'Get a quote'
  }) {
    const {
      Button
    } = DS();
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--navy-700)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...CONTAINER,
        paddingTop: 60,
        paddingBottom: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 32,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 680
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '0 0 8px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-2xl)',
        color: '#fff'
      }
    }, "Ready when you are"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'rgba(255,255,255,0.78)',
        fontSize: 'var(--text-md)',
        lineHeight: 1.55
      }
    }, cta)), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => onNavigate('contact')
    }, label)));
  }
  window.Blocks = {
    Breadcrumb,
    Hero,
    HeroVisual,
    Section,
    StatCallout,
    ChildCards,
    FAQ,
    CTABand,
    CONTAINER
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/blocks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/nav.js
try { (() => {
// 31G site navigation tree + per-page icon map (Lucide names).
window.NAV = [{
  slug: 'home',
  label: 'Home'
}, {
  slug: 'software-development',
  label: 'Software Development',
  children: ['web-application-development', 'mobile-app-development', 'ai-automation', 'saas-product-development', 'cloud-devops', 'software-house-london']
}, {
  slug: 'bpo-services',
  label: 'BPO Services',
  children: ['outsourced-hr-services', 'finance-accounting-outsourcing', 'customer-support-outsourcing', 'digital-marketing-services', 'back-office-support-services']
}, {
  slug: 'nhs-healthcare-technology',
  label: 'NHS & Healthcare'
}, {
  slug: 'industries',
  label: 'Industries',
  children: ['health-tech', 'fintech', 'proptech']
}, {
  slug: 'case-studies',
  label: 'Case Studies'
}, {
  slug: 'about',
  label: 'Company'
}, {
  slug: 'contact',
  label: 'Contact'
}];
window.PAGE_ICON = {
  'home': 'Sparkles',
  'software-development': 'Code2',
  'web-application-development': 'AppWindow',
  'mobile-app-development': 'Smartphone',
  'ai-automation': 'BrainCircuit',
  'saas-product-development': 'Rocket',
  'cloud-devops': 'Cloud',
  'bpo-services': 'Users',
  'outsourced-hr-services': 'UserPlus',
  'finance-accounting-outsourcing': 'Calculator',
  'customer-support-outsourcing': 'Headset',
  'digital-marketing-services': 'Megaphone',
  'back-office-support-services': 'ClipboardList',
  'nhs-healthcare-technology': 'HeartPulse',
  'software-house-london': 'Building2',
  'industries': 'Layers',
  'health-tech': 'Stethoscope',
  'fintech': 'Landmark',
  'proptech': 'Building',
  'case-studies': 'Trophy',
  'about': 'Compass',
  'contact': 'Mail'
};
// short labels for nav/cards (page.name is canonical)
window.PAGE_SHORT = {
  'nhs-healthcare-technology': 'NHS & Healthcare Tech',
  'about': 'Company'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/nav.js", error: String((e && e.message) || e) }); }

// ui_kits/website/pages.js
try { (() => {
window.PAGES = {
  "home": {
    "slug": "home",
    "name": "Home",
    "url": "/",
    "meta": {
      "title": "31G │ AI Powered Digital Transformation Partner UK",
      "desc": "Cost effective, AI powered digital transformation for UK business: software, NHS technology, BPO and marketing, at 30 to 40% below typical UK rates.",
      "primary": "AI powered digital transformation partner UK",
      "schema": "Organization + LocalBusiness + WebSite"
    },
    "eyebrow": "AI POWERED DIGITAL TRANSFORMATION",
    "h1": "The AI-powered digital transformation partner driving value for UK business",
    "intro": "31G puts AI at the core of the software we build, the healthcare platforms we integrate, the back office we run and the marketing that fills your pipeline. You get senior UK leadership, local contracts and one accountable point of contact, and because we run our own delivery model, clients routinely pay 30 to 40% less than typical UK agency rates without trading away quality.",
    "sections": [{
      "title": "AI at the core, not bolted on the side",
      "lead": "AI runs through how we write and test software, integrate clinical systems, process documents and sharpen marketing, with senior people accountable for every output.",
      "bullets": ["Applied AI from code generation and automated testing to document processing and triage", "Human review and English law accountability on anything touching customers, patients or numbers", "Founders with two decades in NHS, enterprise telecoms and regulated fintech keep our AI grounded"],
      "stat": {
        "value": "20+ yrs",
        "label": "regulated delivery experience guiding how we apply AI in production"
      }
    }, {
      "title": "Cost effective by design, not by cutting corners",
      "lead": "Index a typical UK delivery team at 100 and the same scope and seniority through 31G lands at 60 to 70. The gap is structural, not a discount.",
      "bullets": ["Over 100 specialists already embedded into companies across the UK and beyond", "Cover that matches your working day, or genuine round the clock support where needed", "One named UK lead who owns the whole engagement and answers the phone"],
      "stat": {
        "value": "60-70",
        "label": "31G indexed delivery cost where the UK market average is 100"
      }
    }, {
      "title": "A model built to be trusted",
      "lead": "Our people are employed by us, trained by us and managed to our standards, so the quality and accountability of an in-house team come as standard.",
      "bullets": ["Permanent teams we employ and develop, never loose freelancers hired by the hour", "Security, confidentiality and IP assignment fixed in English law contracts", "Senior leadership stays close to every account, so scale never means losing the thread"],
      "stat": null
    }, {
      "title": "Capabilities",
      "lead": "Four disciplines under one accountable partner, with AI built into each.",
      "bullets": ["AI & Automation: AI agents, machine learning and automation in real workflows, with human oversight", "Software Development: web, mobile, SaaS and MVP, cloud and DevOps, led by senior UK engineers", "NHS & Healthcare Tech: EMIS and SystmOne integration, FHIR and HL7, AI in clinical workflows", "BPO & Workforce: outsourced HR, finance, support and back office in your tools, to your processes", "Digital Marketing: SEO, content, paid and analytics measured against pipeline, not vanity metrics"],
      "stat": null
    }, {
      "title": "Success stories",
      "lead": "Real engagements, real numbers, across fintech, healthcare and proptech.",
      "bullets": ["Octa (Fintech): AI prioritised collections cut days sales outstanding by around 30%", "Simply Connect (Healthcare): award winning platform used by over 100,000 organisations", "Qwikify (Healthcare): NHS integration that turns care planning from hours into minutes", "Wahed (Fintech): multi year product partnership building at global scale", "Carter Gem (PropTech): investor focused UX and brand for a platform built on trust"],
      "stat": null
    }],
    "faqs": [{
      "q": "What does an AI powered digital transformation partner actually do?",
      "a": "We combine four capabilities most companies buy separately, software, NHS grade healthcare technology, BPO and digital marketing, with AI built into each, under one accountable partner."
    }, {
      "q": "How do you deliver the same quality for 30 to 40% less?",
      "a": "The saving is structural: our own delivery model with no agency property overhead, no reseller margin and no middle management layers, plus automation built into every engagement."
    }, {
      "q": "Will I work with senior people or be handed to juniors after the pitch?",
      "a": "You get one named senior UK lead from first call to go live, and the founders stay hands on with client accounts. No bait and switch."
    }, {
      "q": "Which sectors do you know best?",
      "a": "Our deepest track record is in three regulated sectors: health tech, fintech and property tech, and those habits raise the standard for every client."
    }],
    "cta": "Tell us what you are trying to transform, ship or save. We will come back within one working day with a straight answer and a price."
  },
  "software-development": {
    "slug": "software-development",
    "name": "Software Development",
    "url": "/software-development/",
    "meta": {
      "title": "Bespoke Software Development UK │ Software House │ 31G",
      "desc": "Bespoke software development from a UK software house. Web and mobile apps, AI and automation, SaaS builds and cloud DevOps at 30 to 40% below typical UK agency rates.",
      "primary": "bespoke software development UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE HOUSE · UK",
    "h1": "Bespoke software development, priced like it should be",
    "intro": "31G is a UK software house building bespoke web, mobile and AI products with senior engineering and without the inflated overheads. Our CTO led teams have shipped for fintech, proptech and healthcare clients, including NHS integrated systems, and because we run our own delivery capacity, comparable scopes come in 30 to 40% under typical UK agency quotes.",
    "sections": [{
      "title": "What we build",
      "lead": "Five specialist practices under one engineering organisation, each with its own team and track record.",
      "bullets": ["Web application development: platforms, portals, internal tools, APIs and legacy rebuilds", "Mobile app development: iOS and Android, native where it matters, cross platform where it pays", "AI and automation: LLM tools, document processing, RPA and analytics", "SaaS and MVP development: from a validated idea to a revenue earning product", "Cloud and DevOps: migration, CI/CD, security and ongoing cost control"],
      "stat": {
        "value": "5",
        "label": "specialist practices under one CTO led engineering organisation"
      }
    }, {
      "title": "How we engage",
      "lead": "Three commercial models, all staffed by the same people to the same standards.",
      "bullets": ["Fixed scope builds with a priced specification and milestone payments you control", "Dedicated teams that extend yours, month to month, with no long lock in", "Take overs and rescues of existing products, starting with a free code review"],
      "stat": {
        "value": "3",
        "label": "engagement models: fixed scope, dedicated team, or project take over"
      }
    }, {
      "title": "Quality you can audit",
      "lead": "The same quality machinery applies to every engagement, whatever the budget.",
      "bullets": ["QA automation and CI/CD on every build, cutting test cycles by up to 60%", "Code reviewed under CTO oversight before anything reaches production", "Full IP assignment and source code access from day one, under English law"],
      "stat": {
        "value": "60%",
        "label": "shorter QA cycles with the automated testing we run as standard"
      }
    }],
    "faqs": [{
      "q": "What is a software house and how is it different from a freelancer?",
      "a": "A software house is a permanent, multi disciplinary team carrying the senior architecture, QA, security and project management serious systems need, standing behind the result under contract."
    }, {
      "q": "Can you take over a project another supplier started?",
      "a": "Yes, regularly. We begin with a free code review that tells you honestly what is salvageable, what needs rebuilding and what it will cost."
    }, {
      "q": "Who owns the code and the intellectual property?",
      "a": "You do, completely, from day one. Full IP assignment and source access are written into every contract under English law, with no lock in."
    }, {
      "q": "How quickly can you start?",
      "a": "We reply to every brief within one working day, scope most engagements within a week, and can stand up dedicated teams within two to three weeks of sign off."
    }],
    "cta": "Send us your brief, your backlog or your broken project. We will reply within one working day with an honest assessment and a price."
  },
  "web-application-development": {
    "slug": "web-application-development",
    "name": "Web Application Development",
    "url": "/web-application-development/",
    "meta": {
      "title": "Web Application Development UK │ Web App Agency │ 31G",
      "desc": "Web application development from a UK software house. Bespoke platforms, customer portals, APIs and legacy rebuilds, engineered in the UK and delivered at sensible rates.",
      "primary": "web application development UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE DEVELOPMENT · WEB",
    "h1": "Web applications built for daily, heavy use",
    "intro": "We build the web applications businesses run on: customer and supplier portals, internal operations platforms, booking and billing systems and the data heavy dashboards leaders open every morning. Modern stacks, clean APIs and proper testing, designed and led in the UK, at a price that does not require a board paper to justify.",
    "sections": [{
      "title": "Platforms and portals",
      "lead": "Bespoke systems shaped around how your business genuinely works, replacing spreadsheets and ageing tools.",
      "bullets": ["Customer and supplier portals with secure self service and clear permissions", "Internal operations platforms that retire spreadsheets and manual handoffs", "Live data dashboards that turn monthly reporting into an everyday view"],
      "stat": {
        "value": "100%",
        "label": "of builds delivered with source code and IP assigned to you"
      }
    }, {
      "title": "APIs and integrations",
      "lead": "We design APIs first and connect the moving parts properly, so data flows cleanly between the tools you already pay for.",
      "bullets": ["REST and event driven APIs with clear, maintained documentation", "Integrations across payment, CRM, accounting and logistics platforms", "Complex healthcare integration delivered, including EMIS, SystmOne and FHIR work"],
      "stat": {
        "value": "21,831",
        "label": "requests handled reliably across one client's integrated microservices"
      }
    }, {
      "title": "Modernisation and rebuilds",
      "lead": "We re-engineer incrementally, so the business keeps running while the platform gets faster, safer and cheaper to maintain.",
      "bullets": ["Legacy application audits and a clear, costed rebuild roadmap", "Phased migration to modern, cloud native architecture", "Performance and security hardening at every step"],
      "stat": {
        "value": "30%",
        "label": "faster time to market typical after modernising to modular architecture"
      }
    }],
    "faqs": [{
      "q": "What counts as a web application rather than a website?",
      "a": "A website presents information; a web application does work, logging people in, processing data, running business logic and integrating with other systems, which is what we specialise in."
    }, {
      "q": "Which technologies do you build with?",
      "a": "We are stack agnostic: commonly React and Next.js with Node, Python or .NET behind them and PostgreSQL for data, chosen to fit your product and team."
    }, {
      "q": "Can you rebuild our existing platform without downtime?",
      "a": "In most cases, yes. We migrate incrementally with rollback plans at every step, so the live service keeps running while the new architecture comes online."
    }, {
      "q": "Will we own the documentation as well as the code?",
      "a": "Yes. We hand over clear API and system documentation alongside the source code and full IP, so any developer can pick the project up quickly."
    }],
    "cta": "Have a web build or a creaking platform in mind? Talk it through with an engineer, not a salesperson."
  },
  "mobile-app-development": {
    "slug": "mobile-app-development",
    "name": "Mobile App Development",
    "url": "/mobile-app-development/",
    "meta": {
      "title": "Mobile App Development Company UK │ iOS & Android │ 31G",
      "desc": "UK mobile app development company building iOS and Android apps, native and cross platform. Design, build, launch and growth at 30 to 40% below typical UK agency rates.",
      "primary": "mobile app development company UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE DEVELOPMENT · MOBILE",
    "h1": "Mobile apps people keep on their phone",
    "intro": "We design and build iOS and Android apps, native where it matters and cross platform where it saves money. Our teams have shipped consumer health apps, fintech products and field operations tools from first sketch to store release. UK product leadership sets the direction; our delivery model keeps the build cost sensible.",
    "sections": [{
      "title": "iOS and Android engineering",
      "lead": "We recommend the right approach for your product and budget, not whatever our team prefers.",
      "bullets": ["Native Swift and Kotlin where performance and platform features demand it", "Flutter and React Native where one codebase can serve both stores well", "Offline first design for apps used in the field or with patchy signal"],
      "stat": {
        "value": "2",
        "label": "app stores covered from a single, well managed codebase where appropriate"
      }
    }, {
      "title": "Design and UX",
      "lead": "Our designers test ideas with real users before engineers write a line of expensive code.",
      "bullets": ["UX research, prototyping and usability testing before the build begins", "Interface design that respects iOS and Android platform conventions", "Accessibility built in from the start, not bolted on at the end"],
      "stat": {
        "value": "3x",
        "label": "quality improvement we see when continuous testing and UX research are built in"
      }
    }, {
      "title": "Launch and growth",
      "lead": "Shipping to the store is the start of the job, not the end of it.",
      "bullets": ["App store submission, review handling and release management", "Analytics, crash reporting and performance monitoring as standard", "Iteration roadmaps driven by real usage data, not guesswork"],
      "stat": {
        "value": "1",
        "label": "team responsible end to end, from first wireframe to live store listing"
      }
    }],
    "faqs": [{
      "q": "Should we build native or cross platform?",
      "a": "It depends: native suits apps leaning on device features or peak performance; cross platform is usually faster and cheaper when one codebase can serve both stores. We give a straight recommendation."
    }, {
      "q": "How much does a mobile app cost to build in the UK?",
      "a": "A focused first version costs far less than agencies quote, because we run our own delivery model and scope to the riskiest assumption first."
    }, {
      "q": "Do you maintain the app after launch?",
      "a": "Yes. Most clients keep us on as a dedicated team for ongoing releases, monitoring and growth work, so the app never quietly rots after version one."
    }],
    "cta": "Tell us about your app idea, or the app that is underperforming. We will give you a build and run price within days."
  },
  "ai-automation": {
    "slug": "ai-automation",
    "name": "AI & Automation",
    "url": "/ai-automation/",
    "meta": {
      "title": "AI & Automation Services UK │ LLMs, RPA & Data │ 31G",
      "desc": "AI and automation services for UK businesses. LLM tools, document processing, robotic process automation and analytics that cut hours of manual work every week.",
      "primary": "AI and automation services UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE DEVELOPMENT · AI & AUTOMATION",
    "h1": "AI and automation that pays for itself",
    "intro": "We build AI and automation that targets a number on your profit and loss: hours of manual work removed, days of payment delay recovered, error rates cut. From LLM assistants and document processing to RPA and forecasting, every project starts with the saving it has to produce. Our own products prove the approach in production every day.",
    "sections": [{
      "title": "Applied AI",
      "lead": "Practical uses of LLMs and machine learning, scoped tightly enough to ship in weeks.",
      "bullets": ["LLM assistants and chatbots trained on your own knowledge and tone of voice", "Intelligent document processing for invoices, contracts, forms and correspondence", "Vision AI and predictive models where the data genuinely supports them"],
      "stat": {
        "value": "20+",
        "label": "hours saved weekly for one finance team by our AI receivables platform"
      }
    }, {
      "title": "Process automation",
      "lead": "We map the process as it really runs, automate the repeatable steps and keep your people on the judgement calls.",
      "bullets": ["Robotic process automation across finance, HR and operations", "Workflow automation that connects the tools you already use", "Exception handling designed with your team, so the system stays trusted"],
      "stat": {
        "value": "30%",
        "label": "reduction in days sales outstanding delivered by our Octa platform"
      }
    }, {
      "title": "Data and analytics",
      "lead": "Automation needs good data underneath it, or it simply scales your mistakes.",
      "bullets": ["Data warehousing, ETL and real time reporting", "Forecasting and management dashboards leaders actually open", "Data governance so the answers stay correct as the business scales"],
      "stat": {
        "value": "23x",
        "label": "data driven companies are more likely to acquire customers"
      }
    }],
    "faqs": [{
      "q": "How do we know AI will actually save us money?",
      "a": "Because we start with the number: before we build, we agree the metric the project has to move and scope to hit it. If AI is not the right answer, we say so."
    }, {
      "q": "Is our data safe if we use AI?",
      "a": "Yes. We design for data protection from the outset, keep sensitive data within controls you approve, and put confidentiality and IP terms in writing under English law."
    }, {
      "q": "Do we need a huge dataset to get started?",
      "a": "Not usually. Many high value automations work from the data you already have, and we tell you honestly whether yours is ready."
    }, {
      "q": "Will AI replace our team?",
      "a": "No. We automate the repetitive, low judgement work so your people spend time on the decisions and relationships that need a human."
    }],
    "cta": "Bring us one painful process. We will tell you honestly whether AI helps, what it costs and what it saves."
  },
  "saas-product-development": {
    "slug": "saas-product-development",
    "name": "SaaS & MVP Development",
    "url": "/saas-product-development/",
    "meta": {
      "title": "SaaS & MVP Development UK │ Product Studio │ 31G",
      "desc": "SaaS product development and MVP builds from a UK software house. Validate fast, launch a product users pay for, then scale it, with one accountable team throughout.",
      "primary": "SaaS product development UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE DEVELOPMENT · SAAS & MVP",
    "h1": "From idea to revenue earning product",
    "intro": "We take products from idea to MVP to scalable SaaS with the same team accountable throughout. Our delivery model means your runway buys 30 to 40% more engineering, often the difference between finding product market fit and running out of road. We scope ruthlessly, ship fast and tell you what to leave out.",
    "sections": [{
      "title": "MVP and validation",
      "lead": "The first version exists to answer a question, not to win design awards.",
      "bullets": ["Product discovery and rapid prototyping to pressure test the idea", "MVPs scoped to test the single riskiest assumption first", "Lean, iterative releases with real user feedback loops built in"],
      "stat": {
        "value": "Weeks",
        "label": "not quarters, to a testable first product in real users' hands"
      }
    }, {
      "title": "SaaS engineering",
      "lead": "Once the idea proves out, we build the platform properly: multi tenant, secure and ready for paying customers.",
      "bullets": ["Multi tenant architecture with billing and subscription management", "Security, access control and audit trails from the start", "Cloud native foundations that scale without expensive rewrites"],
      "stat": {
        "value": "30%",
        "label": "faster launch typical with modern, modular product architecture"
      }
    }, {
      "title": "Scale and support",
      "lead": "We have grown platforms well past their first hundred thousand users and stayed on as long term partners.",
      "bullets": ["Ongoing product development as a managed, dedicated team", "Performance, reliability and cost optimisation as you grow", "Long term partnerships, like our multi year work scaling a global platform"],
      "stat": {
        "value": "100,000+",
        "label": "organisations on a healthcare platform we helped scale"
      }
    }],
    "faqs": [{
      "q": "What is the difference between an MVP and a full product?",
      "a": "An MVP is the smallest product that tests your most important assumption with real users; the full product is what you build once that assumption is proven."
    }, {
      "q": "How long does it take to build an MVP?",
      "a": "Usually weeks, not quarters. We scope hard to the one question the MVP needs to answer, keeping the build small, fast and affordable."
    }, {
      "q": "Will the MVP code survive into the real product?",
      "a": "We build MVPs cleanly enough to extend but honestly enough to throw away if the learning demands it, and we tell you upfront which parts are foundations."
    }],
    "cta": "Pitch us the product. We will tell you what the MVP should leave out, and what it will cost to find out if you are right."
  },
  "cloud-devops": {
    "slug": "cloud-devops",
    "name": "Cloud & DevOps",
    "url": "/cloud-devops/",
    "meta": {
      "title": "Cloud & DevOps Services UK │ Migration & SRE │ 31G",
      "desc": "Cloud and DevOps services for UK businesses. Cloud migration, CI/CD pipelines, security and cost optimisation that make your platform faster, safer and cheaper to run.",
      "primary": "cloud and DevOps services UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE DEVELOPMENT · CLOUD & DEVOPS",
    "h1": "Cloud that costs less and breaks less",
    "intro": "We design, migrate and run cloud platforms for businesses that need reliability without carrying a platform team on UK salaries. Senior engineers make the architecture and security decisions; our delivery model runs the day to day pipeline and infrastructure work. Clients typically end up with a faster platform and a smaller cloud bill.",
    "sections": [{
      "title": "Migration and architecture",
      "lead": "We move workloads to the cloud, or between clouds, without the high risk weekend nobody enjoys.",
      "bullets": ["Cloud architecture design on AWS, Azure and Google Cloud", "Phased migrations with a rollback plan at every step", "Infrastructure as code so environments are reproducible and auditable"],
      "stat": {
        "value": "£124,200",
        "label": "of cloud architecture cost optimised and tracked transparently for one client"
      }
    }, {
      "title": "CI/CD and automation",
      "lead": "Releases should be a daily habit, not a quarterly event everyone dreads.",
      "bullets": ["CI/CD pipelines with automated testing gates", "Release automation and clean environment management", "Monitoring and alerting that surfaces real problems, not noise"],
      "stat": {
        "value": "30%",
        "label": "faster time to market typical with DevOps automation in place"
      }
    }, {
      "title": "Security and cost control",
      "lead": "We treat DevSecOps as a practice, not a slide in a pitch.",
      "bullets": ["Security scanning and compliance baked into the delivery pipeline", "Monthly cloud cost reviews with concrete, prioritised savings actions", "Resilient design that prevents downtime rather than just reacting to it"],
      "stat": {
        "value": "4.2%",
        "label": "downtime overhead removed for one client through resilient design"
      }
    }],
    "faqs": [{
      "q": "Can you reduce our cloud bill without breaking anything?",
      "a": "Usually, yes. Most bills carry obvious waste; we audit first, act on safe wins immediately and re-architect bigger savings carefully with no impact on reliability."
    }, {
      "q": "Do you support AWS, Azure and Google Cloud?",
      "a": "All three, plus IBM and Oracle Cloud where needed. We are not tied to one provider, so our hosting advice is based on your needs."
    }, {
      "q": "What is DevSecOps and do we need it?",
      "a": "It means building security checks directly into your release pipeline. If you handle customer data, payments or anything regulated, you need it, and we make it routine."
    }, {
      "q": "Do we need a full time platform engineer to work with you?",
      "a": "No. We provide cloud and DevOps as a managed service, so you get senior platform engineering without the salary, recruitment and retention of an in-house team."
    }],
    "cta": "Send us last month's cloud bill. We will come back with the savings we would target and how."
  },
  "bpo-services": {
    "slug": "bpo-services",
    "name": "BPO Services",
    "url": "/bpo-services/",
    "meta": {
      "title": "BPO Services UK │ Business Process Outsourcing │ 31G",
      "desc": "BPO services for UK companies. Outsourced HR, finance, customer support, digital marketing and back office teams, managed under English law and run by people we employ.",
      "primary": "BPO services UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · BUSINESS PROCESS OUTSOURCING",
    "h1": "BPO that gives you your margins back",
    "intro": "31G runs business process outsourcing for UK companies that want dependable back office teams without UK salary costs on every function. Our people are employed, trained and managed by us, working your hours, in your tools, to your processes, under English law with a named UK account manager. Clients typically cut the cost of the functions we take on by 30 to 40%.",
    "sections": [{
      "title": "What we run for you",
      "lead": "Five core functions, each with a dedicated page and a team that does this work all day.",
      "bullets": ["Outsourced HR: recruitment, onboarding, payroll support and employee care", "Finance and accounting: bookkeeping, reporting and credit control", "Customer support: omnichannel teams, your hours or genuine 24/7", "Digital marketing: SEO, content, paid media, design and video", "Back office: admin, data processing, operations and compliance support"],
      "stat": {
        "value": "5",
        "label": "core functions delivered as managed teams, not loose freelancers"
      }
    }, {
      "title": "How an engagement works",
      "lead": "We start small on purpose, so you never bet a whole department on an untested supplier.",
      "bullets": ["Discovery: we document the process exactly as it runs today", "Pilot: one or two seats prove quality before anything scales", "Scale: grow the team with a named manager and SLAs you approve"],
      "stat": {
        "value": "30-40%",
        "label": "typical reduction in operating cost for the functions clients move to 31G"
      }
    }, {
      "title": "Why our model is different",
      "lead": "We are an employer, not a middleman, and that shows up in retention, quality and how fast problems get fixed.",
      "bullets": ["Permanent staff on our payroll, with our training and clear career paths", "Data handling, confidentiality and quality terms fixed under English law", "A named UK account manager who owns the relationship and the SLAs"],
      "stat": {
        "value": "24/7",
        "label": "coverage available where the work genuinely needs round the clock teams"
      }
    }],
    "faqs": [{
      "q": "What is BPO and which functions can you outsource?",
      "a": "It means handing a defined business function to a specialist who runs it as a managed service: HR, finance, customer support, digital marketing and back office, individually or combined."
    }, {
      "q": "How is 31G different from a typical outsourcing company?",
      "a": "We employ our teams rather than reselling freelancers and manage every engagement under English law with a named UK contact, giving in-house accountability at a lower cost."
    }, {
      "q": "Do I have to outsource a whole department at once?",
      "a": "No. We start with a small pilot of one or two seats so you can judge our quality before scaling. You control how far and how fast it grows."
    }, {
      "q": "Will the team work in our systems?",
      "a": "Yes. Our people work inside your tools and to your processes, so your data and history stay with you."
    }],
    "cta": "Tell us which function is costing too much. We will map it, price it and propose a pilot you can judge us on."
  },
  "outsourced-hr-services": {
    "slug": "outsourced-hr-services",
    "name": "Outsourced HR Services",
    "url": "/outsourced-hr-services/",
    "meta": {
      "title": "Outsourced HR Services UK │ HR Outsourcing │ 31G",
      "desc": "Outsourced HR services for UK businesses. Recruitment, onboarding, payroll support, records and employee care, run by a dedicated team at a fraction of in house cost.",
      "primary": "outsourced HR services UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · HUMAN RESOURCES",
    "h1": "An HR function without the headcount",
    "intro": "Growing companies need real HR long before they can justify an HR department. Our outsourced HR teams run recruitment, onboarding, payroll administration, records and employee care as a managed service. You keep control of the policies and decisions; we do the steady work that keeps them accurate and on time, for a fraction of hiring in house.",
    "sections": [{
      "title": "Recruitment and onboarding",
      "lead": "We run the hiring pipeline so your managers only meet candidates worth meeting.",
      "bullets": ["Job posting, sourcing, screening and interview scheduling", "Offer administration, referencing and right to work checks", "Structured onboarding so new starters are productive in week one"],
      "stat": {
        "value": "100+",
        "label": "roles sourced, vetted and placed through our resourcing operation"
      }
    }, {
      "title": "Payroll and compliance support",
      "lead": "This is where a mistake costs trust, not just time, so we run it with checked, documented accuracy.",
      "bullets": ["Payroll preparation and processing support for your provider", "Holiday, absence and benefits administration kept accurate", "Policy administration kept current and applied consistently"],
      "stat": {
        "value": "Monthly",
        "label": "payroll cycles run clean, every time, with a documented audit trail"
      }
    }, {
      "title": "Records and employee care",
      "lead": "Tidy records and a responsive first point of contact are what employees notice about HR.",
      "bullets": ["Digital employee records, contracts and letters kept in order", "First line response to everyday employee HR queries", "Reporting on headcount, absence and turnover your board can use"],
      "stat": {
        "value": "1",
        "label": "dedicated HR coordinator as your team's consistent point of contact"
      }
    }],
    "faqs": [{
      "q": "Can outsourced HR work alongside our existing manager or HR lead?",
      "a": "Absolutely. Many clients keep a senior HR decision maker in house and use us for the administrative weight: recruitment, onboarding, payroll support and records."
    }, {
      "q": "Do you handle UK employment compliance?",
      "a": "We run the administration that keeps you compliant, including right to work checks and consistent policy application, and work alongside your employment solicitor on complex cases."
    }, {
      "q": "Is our employee data kept confidential?",
      "a": "Yes. Confidentiality and data handling are fixed in your contract under English law, with access limited to your assigned team."
    }, {
      "q": "How quickly can outsourced HR support start?",
      "a": "Most HR engagements move from first conversation to a working pilot within a couple of weeks, ramping up at a pace you are comfortable with."
    }],
    "cta": "Tell us your headcount and your HR headaches. We will price a managed HR service against the cost of your next HR hire."
  },
  "finance-accounting-outsourcing": {
    "slug": "finance-accounting-outsourcing",
    "name": "Finance & Accounting Outsourcing",
    "url": "/finance-accounting-outsourcing/",
    "meta": {
      "title": "Finance & Accounting Outsourcing UK │ 31G",
      "desc": "Finance and accounting outsourcing for UK companies. Bookkeeping, accounts payable and receivable, management reporting and credit control, delivered accurately by a dedicated team.",
      "primary": "finance and accounting outsourcing UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · FINANCE & ACCOUNTS",
    "h1": "Books done right, every month",
    "intro": "We run finance operations for UK companies: bookkeeping, accounts payable and receivable, management reporting and credit control. Your accountant keeps strategic control; our team does the daily and monthly work inside your systems, to your close calendar. Because we also build AI finance software, our teams work with automation most providers do not have.",
    "sections": [{
      "title": "Bookkeeping, payables and receivables",
      "lead": "Clean ledgers are the foundation of every good decision, so we keep yours current daily.",
      "bullets": ["Transaction processing in Xero, QuickBooks, Sage and similar", "Supplier invoice processing and payment runs prepared for approval", "Sales invoicing and receipt allocation kept up to date"],
      "stat": {
        "value": "99.3%",
        "label": "reporting accuracy rate maintained across our processed transactions"
      }
    }, {
      "title": "Management reporting",
      "lead": "Numbers that arrive on time and actually mean something, to your timetable.",
      "bullets": ["Monthly management accounts delivered to your agreed timetable", "Cash flow and KPI reporting your leadership team will genuinely read", "Year end preparation that reduces your accountant's bill"],
      "stat": {
        "value": "34,210",
        "label": "transactions processed in one client engagement, with accuracy tracked"
      }
    }, {
      "title": "Credit control and collections",
      "lead": "Polite, persistent and systematic, using the same playbook that powers our AI receivables platform.",
      "bullets": ["Structured chasing cycles with a full, auditable contact history", "Dispute logging and escalation paths agreed with you in advance", "AI assisted prioritisation of which accounts to chase first"],
      "stat": {
        "value": "30%",
        "label": "cut in days sales outstanding achieved by our receivables approach"
      }
    }],
    "faqs": [{
      "q": "Will outsourced finance replace our accountant?",
      "a": "No. We handle the daily and monthly operational work while your accountant keeps strategic control, making their job easier and their fees lower."
    }, {
      "q": "Which accounting software do you work in?",
      "a": "We work in your systems, including Xero, QuickBooks and Sage, so your data and history stay in one place and you keep full ownership."
    }, {
      "q": "How do you speed up our cash collection?",
      "a": "We run structured, systematic chasing with AI assisted prioritisation, focusing on the accounts most likely to pay; clients typically see DSO fall by around 30%."
    }, {
      "q": "Can you run our whole finance function or just parts of it?",
      "a": "Either. Some hand us the full operational finance function; others start with one piece such as bookkeeping or credit control and add more later."
    }],
    "cta": "Show us your month end. We will tell you which parts we can take, what it costs and how much faster you would close."
  },
  "customer-support-outsourcing": {
    "slug": "customer-support-outsourcing",
    "name": "Customer Support Outsourcing",
    "url": "/customer-support-outsourcing/",
    "meta": {
      "title": "Customer Support Outsourcing UK │ 24/7 Teams │ 31G",
      "desc": "Customer support outsourcing for UK companies. Trained omnichannel teams on email, chat and phone, your hours or 24/7, with QA scores and SLAs you set.",
      "primary": "customer support outsourcing UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · CUSTOMER SUPPORT",
    "h1": "Support your customers actually rate",
    "intro": "We build and run customer support teams for UK companies: trained agents on email, chat and phone, working in your helpdesk and to your tone of voice. Cover business hours, extend into evenings and weekends, or run genuine 24/7. Every conversation is quality scored against the standards you set, on dashboards you can see.",
    "sections": [{
      "title": "Omnichannel cover",
      "lead": "One team across every channel your customers use, trained before they go live.",
      "bullets": ["Email, live chat, phone and social inbox handled by one team", "Agents trained on your product, policies and tone before going live", "We work in your tools: Zendesk, Intercom, Freshdesk and similar"],
      "stat": {
        "value": "Your tools",
        "label": "we work inside your helpdesk, so you keep the data and the history"
      }
    }, {
      "title": "Your hours or all hours",
      "lead": "Flexible cover is the quiet advantage of our delivery model.",
      "bullets": ["UK business hours cover with full overlap with your team", "Out of hours and weekend extension without unsocial hours premiums", "Genuine 24/7 rosters for products and services that never sleep"],
      "stat": {
        "value": "24/7",
        "label": "coverage without the cost structure of UK night and weekend staffing"
      }
    }, {
      "title": "Quality and service levels",
      "lead": "Outsourced should never mean out of sight, so we measure everything and share all of it.",
      "bullets": ["Quality scoring on real conversations against your rubric", "Response and resolution SLAs agreed and reported every week", "Continuous coaching loops driven by the quality data"],
      "stat": {
        "value": "75",
        "label": "point quality benchmark maintained across our managed teams"
      }
    }],
    "faqs": [{
      "q": "Will outsourced agents sound like our brand?",
      "a": "Yes. We train every agent on your product, policies and tone before they take a single contact, and quality score conversations against your standards."
    }, {
      "q": "Can you provide genuine 24/7 cover?",
      "a": "We can. Our delivery model lets us run true round the clock rosters and weekend cover without the unsocial hours premiums that make in house 24/7 so costly."
    }, {
      "q": "How do we know the support quality is good?",
      "a": "You see the same numbers we do: quality scores on real conversations against your rubric, plus response and resolution SLAs reported every week."
    }, {
      "q": "Can you scale the team up for busy periods?",
      "a": "Yes. A managed team can flex up for launches or seasonal peaks and settle back down again, without you hiring and later releasing permanent staff."
    }],
    "cta": "Tell us your ticket volume and hours. We will price a pilot team and the SLAs we would commit to."
  },
  "digital-marketing-services": {
    "slug": "digital-marketing-services",
    "name": "Digital Marketing Services",
    "url": "/digital-marketing-services/",
    "meta": {
      "title": "Outsourced Digital Marketing Services UK │ 31G",
      "desc": "Outsourced digital marketing for UK businesses. SEO, content, paid media, social, design and video delivered by a full team for less than the cost of one senior hire.",
      "primary": "outsourced digital marketing UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · DIGITAL MARKETING",
    "h1": "A full marketing team for the cost of one hire",
    "intro": "Most growing companies need a strategist, an SEO specialist, a content writer, a paid media manager, a designer and a video editor, and almost none can afford all six. Our outsourced digital marketing teams give you the full bench as a managed service, directed by UK based strategy and measured on pipeline, not vanity metrics.",
    "sections": [{
      "title": "SEO and content",
      "lead": "Being found is a system, not a lottery, so we build visibility the compounding way.",
      "bullets": ["Technical SEO, on page optimisation and keyword strategy", "Content writing that reads like a human and ranks like it should", "Visibility in AI answer engines as well as traditional search"],
      "stat": {
        "value": "40%",
        "label": "year on year growth in search and AI driven discovery we target"
      }
    }, {
      "title": "Paid media and social",
      "lead": "Campaigns measured on pipeline, not impressions, with creative produced in house.",
      "bullets": ["PPC management across Google and LinkedIn", "Organic social calendars planned, written and scheduled", "Landing pages built and tested by our own developers"],
      "stat": {
        "value": "23x",
        "label": "data driven marketing teams are more likely to acquire customers"
      }
    }, {
      "title": "Design and video",
      "lead": "The production capacity that usually becomes the bottleneck, available on tap.",
      "bullets": ["Brand, campaign and sales collateral design", "Motion graphics and video editing", "Presentations and pitch materials that close rooms"],
      "stat": {
        "value": "6",
        "label": "specialist roles in one managed team, for one predictable monthly fee"
      }
    }],
    "faqs": [{
      "q": "Is this an agency or an outsourced team?",
      "a": "Think of it as your marketing team run as a managed service: a full bench of specialists directed by UK strategy, for roughly the cost of a single senior hire."
    }, {
      "q": "How long until SEO produces results?",
      "a": "Meaningful organic visibility usually builds over three to six months as authority compounds; paid media can produce leads much faster, so we often run both."
    }, {
      "q": "Do you optimise for AI answer engines as well as Google?",
      "a": "Yes. We structure content so it can be cited by tools like AI Overviews, ChatGPT and Perplexity, not just ranked by traditional search."
    }, {
      "q": "Do we commit to a long contract?",
      "a": "No long lock in. We work as a managed service on sensible terms and would rather keep you by performing than by paperwork."
    }],
    "cta": "Tell us your growth target and current marketing spend. We will show you what the same budget buys with a full team."
  },
  "back-office-support-services": {
    "slug": "back-office-support-services",
    "name": "Back Office Outsourcing",
    "url": "/back-office-support-services/",
    "meta": {
      "title": "Back Office Outsourcing UK │ Admin & Operations │ 31G",
      "desc": "Back office outsourcing for UK companies. Admin, data processing, operations, logistics and compliance support run accurately by dedicated, permanent teams.",
      "primary": "back office outsourcing UK",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "BPO · BACK OFFICE",
    "h1": "The unglamorous work, done brilliantly",
    "intro": "Every business runs on work nobody celebrates: data entry, document processing, order administration, scheduling and compliance checklists. It has to be accurate and on time, and it should not be eating into UK salaries. Our back office teams take it on as a managed service, with documented processes, quality checks and clear reporting.",
    "sections": [{
      "title": "Admin and data processing",
      "lead": "High volume, accuracy critical work is exactly what our teams are built and measured for.",
      "bullets": ["Data entry, cleansing and migration between systems", "Document processing, indexing and digital filing", "CRM and database upkeep your sales team will thank you for"],
      "stat": {
        "value": "99%+",
        "label": "accuracy targets with double checking on critical data work"
      }
    }, {
      "title": "Operations and logistics support",
      "lead": "The coordination layer that quietly keeps customer promises.",
      "bullets": ["Order processing and fulfilment administration", "Scheduling, dispatch support and supplier coordination", "Reporting that gives operations leaders a live picture"],
      "stat": {
        "value": "8%+",
        "label": "weekly operational efficiency gains tracked in one managed engagement"
      }
    }, {
      "title": "Compliance and governance support",
      "lead": "Checklists, registers and evidence packs maintained properly, so audits stop being emergencies.",
      "bullets": ["Compliance administration and register maintenance", "Audit preparation and evidence gathering throughout the year", "Process documentation kept accurate as things change"],
      "stat": {
        "value": "96%",
        "label": "compliance score maintained on one client engagement, audit ready"
      }
    }],
    "faqs": [{
      "q": "What kinds of tasks should we move to a back office team?",
      "a": "Anything high volume, rules based and repeatable: data entry, document processing, order administration, scheduling and compliance upkeep that does not need your best people's judgement."
    }, {
      "q": "How do you keep accuracy high on bulk work?",
      "a": "Documented processes, double checking on critical data and quality reporting you can see. We target 99% plus accuracy and track it."
    }, {
      "q": "Can you take on seasonal or one off processing spikes?",
      "a": "Yes. A managed team can flex up for migrations, backlogs or seasonal peaks and flex back down again, without you hiring and then letting people go."
    }, {
      "q": "How do we hand a process over to your team?",
      "a": "We document it as it runs today, agree the quality standard and reporting, then run a short pilot before scaling, which often makes it run better than it did in house."
    }],
    "cta": "List the tasks your best people should not be doing. We will quote a team to take them, accurately and permanently."
  },
  "nhs-healthcare-technology": {
    "slug": "nhs-healthcare-technology",
    "name": "NHS & Healthcare Tech",
    "url": "/nhs-healthcare-technology/",
    "meta": {
      "title": "NHS Software Development & Integration Company │ 31G",
      "desc": "NHS grade software development, EMIS and SystmOne integration, FHIR and HL7 interoperability and AI in clinical workflows, built to DSP Toolkit standards.",
      "primary": "NHS software development company",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "NHS & HEALTHCARE TECHNOLOGY",
    "h1": "NHS grade software, integration and AI for healthcare",
    "intro": "We build and integrate software to NHS standards, then add AI where it safely earns its place in clinical and operational workflows. From EMIS, SystmOne and GP Connect integration to FHIR and HL7 interoperability, our teams ship platforms that clear information governance and scale across trusts. Founders with more than twenty years of NHS delivery keep every build compliant and clinically safe.",
    "sections": [{
      "title": "What we deliver for healthcare",
      "lead": "A full healthcare technology capability, from first integration to AI assisted operations.",
      "bullets": ["NHS systems integration: EMIS, SystmOne, GP Connect, the e-Referral Service and the Spine", "FHIR and HL7 interoperability, messaging and clinical data exchange", "Healthcare software across web, mobile and patient facing platforms", "AI in clinical and operational workflows, with clinician oversight on anything affecting care"],
      "stat": {
        "value": "100,000+",
        "label": "organisations using a healthcare platform we helped scale"
      }
    }, {
      "title": "Built to NHS information governance from day one",
      "lead": "Compliance is designed in, not retrofitted when an audit looms.",
      "bullets": ["Data Security and Protection Toolkit aligned delivery", "DCB0129 and DCB0160 clinical safety cases and hazard logs", "Cyber Essentials Plus practices and data handling under English law"],
      "stat": {
        "value": "DSPT",
        "label": "aligned delivery, with clinical safety documented as standard"
      }
    }, {
      "title": "Proof in the NHS space",
      "lead": "We have shipped real platforms used at national scale, not slideware.",
      "bullets": ["Qwikify: NHS systems integration that turns care planning from hours into minutes", "Simply Connect: an award winning platform used by over 100,000 organisations", "Secure healthcare platforms built to scale across providers"],
      "stat": {
        "value": "Minutes",
        "label": "care planning time, down from hours, through NHS integration"
      }
    }],
    "faqs": [{
      "q": "Can you integrate with EMIS, SystmOne and GP Connect?",
      "a": "Yes. NHS systems integration is core to what we do, including EMIS, SystmOne, GP Connect, the e-Referral Service and the Spine, plus FHIR and HL7 interoperability."
    }, {
      "q": "Do you work to NHS information governance and clinical safety standards?",
      "a": "We do: delivery aligned to the Data Security and Protection Toolkit, DCB0129 and DCB0160 safety cases and hazard logs, with Cyber Essentials Plus practices throughout."
    }, {
      "q": "Is it safe to use AI in clinical workflows?",
      "a": "It is, done properly. We keep clinician oversight on anything affecting care, treat AI as support for clinical judgement, and document the safety case for every use."
    }, {
      "q": "We are a health tech company, not a trust. Can you still help?",
      "a": "Yes. We work with trusts, primary care providers and health tech companies alike, building the platforms and the NHS integrations that make them useful."
    }],
    "cta": "Tell us about your NHS or healthcare platform. We will reply within one working day on integration, compliance and cost."
  },
  "software-house-london": {
    "slug": "software-house-london",
    "name": "Software House London",
    "url": "/software-house-london/",
    "meta": {
      "title": "Software House in London │ Bespoke Development │ 31G",
      "desc": "Comparing software houses in London? 31G delivers London grade bespoke software at 30 to 40% less, with senior UK leadership and meetings in London when you need them.",
      "primary": "software house London",
      "schema": "Service + BreadcrumbList"
    },
    "eyebrow": "SOFTWARE HOUSE · LONDON CLIENTS",
    "h1": "London software house output, without London invoices",
    "intro": "If you are comparing software houses in London, put us on the list before you sign anything. We already build for London businesses, including a leading primary care provider and a CQC regulated diagnostics firm, and we meet in London as often as the work needs. London agencies carry London rent, salaries and margins; we carry none, so London scopes come in 30 to 40% under London quotes.",
    "sections": [{
      "title": "Who we work with in London",
      "lead": "Our London clients are regulated, demanding and short on patience for agency theatre.",
      "bullets": ["Fintech and investment platforms, including long term product work", "Healthcare providers and regulated diagnostics firms", "Scale ups and SMEs replacing expensive agencies mid project"],
      "stat": {
        "value": "20+",
        "label": "years of founder experience delivering for London enterprise and the NHS"
      }
    }, {
      "title": "The honest cost comparison",
      "lead": "Our cost advantage is structural, not a discount on quality.",
      "bullets": ["Senior UK leadership and architecture, the equal of any London firm", "Delivery through our own model, not a chain of subcontractors", "Typical saving of 30 to 40% on comparable scope and seniority"],
      "stat": {
        "value": "30-40%",
        "label": "typical saving against London agency quotes for the same scope"
      }
    }, {
      "title": "How working together feels",
      "lead": "Distance is a spreadsheet concern, not a delivery one.",
      "bullets": ["Kick off and key workshops in person in London", "Full working hours overlap with your team, every day", "One accountable UK contact from first call to live"],
      "stat": {
        "value": "1 day",
        "label": "to a straight answer on any London brief you send us"
      }
    }],
    "faqs": [{
      "q": "Are you actually based in London?",
      "a": "Our clients are. We work with London businesses and meet in London for kick offs and key workshops as often as the work needs, while keeping our cost base lean."
    }, {
      "q": "Why are you cheaper than a London agency for the same work?",
      "a": "London agencies carry London rent, salaries and margins; we do not. The saving is structural, with the same senior leadership and standards."
    }, {
      "q": "Can we meet face to face?",
      "a": "Yes. We run the moments that benefit most from being in the room, kick offs and key workshops, in person in London, and stay in full hours overlap for everything else."
    }, {
      "q": "Will distance affect the quality of delivery?",
      "a": "No. With full working hours overlap, one accountable UK contact and senior leadership across the work, most London clients say they see us more than their previous agency."
    }],
    "cta": "Get a second quote before you commit to a London agency. Ten minutes with us could save you a third of the budget."
  },
  "industries": {
    "slug": "industries",
    "name": "Industries",
    "url": "/industries/",
    "meta": {
      "title": "Industries We Serve: Health Tech, Fintech, PropTech │ 31G",
      "desc": "31G delivers AI powered software and outsourcing for three regulated sectors: health tech, fintech and property tech, with the compliance habits each one demands.",
      "primary": "software development for regulated industries UK",
      "schema": "CollectionPage + BreadcrumbList"
    },
    "eyebrow": "CORE INDUSTRIES",
    "h1": "Industries where we have shipped, not just pitched",
    "intro": "Our deepest experience is in three regulated, trust sensitive sectors: health tech, fintech and property tech. We bring the compliance habits these industries demand to every engagement, and still take strong work across retail, professional services and the charity sector. Regulated work raises the floor for everyone, so your project inherits standards it might never have demanded on its own.",
    "sections": [{
      "title": "Three sectors, one standard of rigour",
      "lead": "Regulated industries do not forgive sloppy delivery, which is exactly why our experience benefits every client.",
      "bullets": ["Health Tech: NHS grade integration, interoperability and AI assisted clinical workflows", "Fintech: investment platforms, AI bookkeeping and accounts receivable automation", "PropTech: investor facing property platforms built for trust and clarity"],
      "stat": {
        "value": "3",
        "label": "core regulated sectors where we hold the deepest, provable track record"
      }
    }, {
      "title": "The same partner across software and operations",
      "lead": "We do not just build the platform and leave; we can run the finance, support and back office behind it.",
      "bullets": ["Software and operations from one accountable partner, not a chain of suppliers", "Compliance and security standards applied consistently across both", "One named UK lead who understands the whole picture, not just a slice of it"],
      "stat": {
        "value": "1",
        "label": "partner across build and run, with no gaps for risk to hide in"
      }
    }, {
      "title": "What regulated discipline gives an unregulated business",
      "lead": "A retailer inherits the access control we built for patient data; a charity inherits the documentation habits we built for clinical safety.",
      "bullets": ["Security and access control habits carried over from healthcare and finance", "Documentation and audit trails that make later scrutiny painless", "One consistent standard of delivery, whatever your sector demands"],
      "stat": {
        "value": "100",
        "label": "indexed standard we hold on every project, regardless of sector or budget"
      }
    }],
    "faqs": [{
      "q": "Do you only work in health tech, fintech and proptech?",
      "a": "Those are our deepest specialisms, but not our only ones. We take strong work in retail, professional services and the charity sector too."
    }, {
      "q": "Why does regulated sector experience matter for my project?",
      "a": "Because security, auditability and accountability become habits rather than afterthoughts; even if you are not regulated, you benefit from that higher standard."
    }, {
      "q": "Can one partner really cover software, healthcare tech and operations?",
      "a": "Yes. The same teams, standards and senior leadership span software, NHS grade healthcare technology and outsourced operations, so you can consolidate suppliers without lowering the bar."
    }],
    "cta": "Tell us your sector and your goal. We will show you the comparable work we have already shipped and what it would cost to do it again for you."
  },
  "health-tech": {
    "slug": "health-tech",
    "name": "Health Tech",
    "url": "/health-tech/",
    "meta": {
      "title": "Health Tech Software Development Company UK │ 31G",
      "desc": "Health tech and NHS software development in the UK. Integration, interoperability and AI in clinical workflows, built to NHS information governance standards.",
      "primary": "health tech software development UK",
      "schema": "WebPage + BreadcrumbList"
    },
    "eyebrow": "INDUSTRY · HEALTH TECH",
    "h1": "Health tech software that clears governance and scales",
    "intro": "We build digital health platforms and integrate them with NHS systems, then add AI where it safely helps clinicians and operations. Our healthcare work is the backbone of our reputation and sets the compliance bar for everything else we do. For the full technical service detail, see our NHS and Healthcare Technology page.",
    "sections": [{
      "title": "What we build in health tech",
      "lead": "From patient and clinician facing platforms to the integration that makes them useful, to NHS standards.",
      "bullets": ["Patient and clinician facing platforms across web and mobile", "Integration with EMIS, SystmOne, GP Connect and FHIR or HL7 interfaces", "AI for triage, documentation and operational efficiency, with clinical oversight"],
      "stat": {
        "value": "100,000+",
        "label": "organisations on a health platform we helped scale"
      }
    }, {
      "title": "Compliance is the starting point",
      "lead": "We design to information governance from day one, so clinical safety is never a last minute scramble.",
      "bullets": ["DSP Toolkit aligned delivery and DCB0129 or DCB0160 clinical safety", "Secure data handling under English law contracts", "Founders with two decades of hands on NHS delivery"],
      "stat": {
        "value": "DSPT",
        "label": "aligned delivery with documented clinical safety"
      }
    }, {
      "title": "Where AI earns its place in care",
      "lead": "We use AI to take weight off clinicians while keeping a clinician firmly in the loop on anything that touches a patient.",
      "bullets": ["Documentation and summarisation that gives clinical time back", "Triage and prioritisation support, with clinical sign off retained", "Operational automation across referrals, scheduling and reporting"],
      "stat": {
        "value": "Hours",
        "label": "of administrative time returned to clinical teams through targeted automation"
      }
    }],
    "faqs": [{
      "q": "Can you help a health tech startup get NHS ready?",
      "a": "Yes. We build patient and clinician facing platforms and the NHS integrations behind them, with the information governance and clinical safety discipline NHS buyers expect."
    }, {
      "q": "What is the difference between this page and your NHS page?",
      "a": "This page covers health tech as an industry we serve; our NHS and Healthcare Technology page covers the full technical service in depth."
    }, {
      "q": "Do you work with private healthcare providers as well as the NHS?",
      "a": "Yes. We build for private clinics, diagnostics firms and digital health companies as well as NHS organisations, applying the same governance and safety discipline."
    }],
    "cta": "Tell us about your health tech idea or NHS integration. We reply within one working day."
  },
  "fintech": {
    "slug": "fintech",
    "name": "Fintech",
    "url": "/fintech/",
    "meta": {
      "title": "Fintech Software Development Company UK │ 31G",
      "desc": "Fintech software development in the UK. Investment platforms, AI bookkeeping and accounts receivable automation for clients including Wahed, Octa and Bookly.",
      "primary": "fintech software development company UK",
      "schema": "WebPage + BreadcrumbList"
    },
    "eyebrow": "INDUSTRY · FINTECH",
    "h1": "Fintech platforms built for scale and trust",
    "intro": "Fintech is where our AI and automation work pays off hardest. We build investment platforms, automate bookkeeping and collections, and ship products that handle money and regulation without breaking under either, with the compliance habits carried over from NHS grade healthcare work. Our fintech clients include Wahed, Octa and Bookly.",
    "sections": [{
      "title": "What we build in fintech",
      "lead": "Products that move money cannot afford to be approximate, so AI does the heavy lifting and senior engineers hold architecture and risk.",
      "bullets": ["Investment and wealth platforms with a global user base, including Wahed", "AI prioritised collections and accounts receivable automation, as built for Octa", "AI bookkeeping and tax workflow tooling, as built for Bookly"],
      "stat": {
        "value": "30%",
        "label": "reduction in days sales outstanding delivered for Octa through AI collections"
      }
    }, {
      "title": "Regulation aware from the first line of code",
      "lead": "We treat security and auditability as features, not paperwork to be added later.",
      "bullets": ["Secure architecture, audit trails and IP assignment in English law contracts", "Senior UK leadership accountable for delivery and risk", "Compliance habits carried over from our NHS grade healthcare work"],
      "stat": {
        "value": "Global",
        "label": "user base scale reached on platforms we have built and run"
      }
    }, {
      "title": "AI where the money actually moves",
      "lead": "The biggest wins are in the operations that quietly leak time and cash, and that is where we point AI.",
      "bullets": ["AI prioritised collections that recover cash sooner", "Automated reconciliation and bookkeeping that cut manual hours", "Real time financial reporting your board can actually trust"],
      "stat": {
        "value": "20+",
        "label": "hours saved weekly for one finance team by our AI receivables work"
      }
    }],
    "faqs": [{
      "q": "Do you understand financial regulation?",
      "a": "We build regulation aware from the start: secure architecture, full audit trails and accountable senior leadership, drawing on our NHS grade compliance discipline, alongside your counsel."
    }, {
      "q": "Can you automate finance operations as well as build platforms?",
      "a": "Yes. We build fintech platforms and automate the operations behind them, from AI prioritised collections to bookkeeping and tax workflows, as we have for Octa and Bookly."
    }, {
      "q": "How do you keep a money moving platform secure?",
      "a": "Security is designed in: secure architecture, audit trails, strict access control and IP assignment under English law, with senior engineers accountable for risk."
    }],
    "cta": "Tell us about your fintech product or process. We reply within one working day with an approach and a price."
  },
  "proptech": {
    "slug": "proptech",
    "name": "PropTech",
    "url": "/proptech/",
    "meta": {
      "title": "PropTech Software Development Company UK │ 31G",
      "desc": "PropTech software development in the UK. Property investment and management platforms built for trust and clarity, including work for Carter Gem.",
      "primary": "proptech software development UK",
      "schema": "WebPage + BreadcrumbList"
    },
    "eyebrow": "INDUSTRY · PROPTECH",
    "h1": "PropTech platforms investors actually trust",
    "intro": "Property technology lives or dies on trust and clarity. We build investor facing property investment and management platforms with the user experience, security and brand execution that make people comfortable committing real money. Our proptech work includes Carter Gem, a property investment platform designed end to end for clarity and confidence.",
    "sections": [{
      "title": "What we build in proptech",
      "lead": "Investor and operator facing platforms that make complex property decisions feel simple and safe.",
      "bullets": ["Property investment platforms with investor focused UX, as built for Carter Gem", "Property and asset management tooling with clear, honest reporting", "AI for document processing, valuations support and operational automation"],
      "stat": {
        "value": "Trust",
        "label": "the design goal on every investor facing proptech build"
      }
    }, {
      "title": "Brand and security in equal measure",
      "lead": "Credibility is part design and part engineering, so we pair strong brand execution with secure engineering.",
      "bullets": ["Strong brand execution that signals legitimacy to investors", "Secure data handling and audit trails under English law contracts", "Senior UK accountability across design, build and run"],
      "stat": {
        "value": "60-70",
        "label": "indexed delivery cost against a UK market average of 100"
      }
    }, {
      "title": "From listing to portfolio, in one platform",
      "lead": "Property businesses need the whole journey to hang together, from first listing to portfolio view.",
      "bullets": ["Investor portals that track holdings, returns and documents in one place", "Listing, onboarding and management flows that feel like one product", "AI for valuations support, document processing and reporting"],
      "stat": {
        "value": "1",
        "label": "joined up platform replacing the usual patchwork of tools"
      }
    }],
    "faqs": [{
      "q": "What makes a good property investment platform?",
      "a": "Trust and clarity: investors commit when a platform looks credible, explains itself plainly and protects their data, so we build for all three."
    }, {
      "q": "Can you handle both the build and the brand?",
      "a": "Yes. Because design, development and data live under one roof, we deliver the look that signals legitimacy and the engineering that backs it up."
    }, {
      "q": "Can you bring our existing property tools into one platform?",
      "a": "Often, yes. We integrate listing, onboarding, management and reporting into a single, joined up experience with clean data underneath."
    }],
    "cta": "Tell us about your proptech platform. We reply within one working day."
  },
  "case-studies": {
    "slug": "case-studies",
    "name": "Case Studies",
    "url": "/case-studies/",
    "meta": {
      "title": "Case Studies │ Software & BPO Results │ 31G",
      "desc": "Real results from 31G clients: 30% lower DSO, 100,000+ organisations served and platforms scaled across multiple markets. See the work behind the claims.",
      "primary": "software development case studies UK",
      "schema": "WebPage + BreadcrumbList"
    },
    "eyebrow": "CASE STUDIES",
    "h1": "The work behind the claims",
    "intro": "Every number on this site traces back to a real engagement. Here are six, across fintech, proptech, healthcare and operations, with the headline figure each one earned. Where we have the client's permission, we are happy to set up a reference call with someone in your sector.",
    "sections": [{
      "title": "Octa · Fintech",
      "lead": "An AI driven accounts receivable platform that cut days sales outstanding by around 30% and saved more than twenty hours weekly.",
      "bullets": ["AI prioritised collections", "Automated chasing workflows", "Real time cash visibility"],
      "stat": {
        "value": "30%",
        "label": "reduction in days sales outstanding"
      }
    }, {
      "title": "Wahed · Fintech",
      "lead": "A global investment platform supported through ongoing product development and scaling, as a long term retained partner.",
      "bullets": ["Multi year partnership", "Product development at scale", "Global user base"],
      "stat": {
        "value": "Years",
        "label": "as a retained technology partner"
      }
    }, {
      "title": "Bookly · Fintech",
      "lead": "An AI powered bookkeeping and tax automation platform, with 31G driving product development and growth across new markets.",
      "bullets": ["AI bookkeeping automation", "Tax workflow tooling", "Multi market growth"],
      "stat": {
        "value": "2",
        "label": "markets grown with one product team"
      }
    }, {
      "title": "Carter Gem · PropTech",
      "lead": "A modern property investment platform designed for clarity, with strong visual identity and a seamless investor experience.",
      "bullets": ["Investor focused UX", "Strong brand execution", "Built for trust"],
      "stat": {
        "value": "1",
        "label": "platform, designed and shipped end to end"
      }
    }, {
      "title": "Simply Connect · Healthcare",
      "lead": "An award winning referral and social prescribing platform used by more than 100,000 organisations at national scale.",
      "bullets": ["Award winning platform", "National scale usage", "Real social impact"],
      "stat": {
        "value": "100,000+",
        "label": "organisations using the platform"
      }
    }, {
      "title": "Qwikify · Healthcare",
      "lead": "A UK care platform generating person centred care plans in minutes, integrated with NHS systems.",
      "bullets": ["NHS systems integration", "Minutes, not hours, per plan", "Care quality focus"],
      "stat": {
        "value": "Minutes",
        "label": "to generate a person centred care plan"
      }
    }, {
      "title": "What every one of these had in common",
      "lead": "Different sectors, one way of working: a named owner, a clear metric and honest reporting against it.",
      "bullets": ["A named UK lead accountable from first call to live system", "AI aimed at the metric that matters, not the feature that demos well", "Measured outcomes and honest reporting, with no subcontracting layer"],
      "stat": {
        "value": "6",
        "label": "engagements, one consistent way of working behind every result"
      }
    }],
    "faqs": [{
      "q": "Are these results real and verifiable?",
      "a": "Yes. Every figure comes from a real client engagement, and where a client agrees we will arrange a reference call so you can hear about the work directly."
    }, {
      "q": "Can I speak to a client in my sector?",
      "a": "Usually, yes. Tell us your sector and we will set up a reference call with a comparable client where we have their permission."
    }, {
      "q": "Do these results carry across software and BPO?",
      "a": "They do. Our case studies span software, AI automation, healthcare integration and outsourced operations, because the same discipline runs through all of it."
    }],
    "cta": "Want a reference call with a client in your sector? Ask. We will set one up."
  },
  "about": {
    "slug": "about",
    "name": "Company",
    "url": "/about/",
    "meta": {
      "title": "About 31G │ UK Software House & BPO Company",
      "desc": "31G is a UK headquartered software house and BPO company, founded by leaders with 20+ years in NHS, enterprise telecoms and regulated fintech delivery.",
      "primary": "software company UK",
      "schema": "AboutPage + Organization + BreadcrumbList"
    },
    "eyebrow": "COMPANY",
    "h1": "Built by people who sat on your side of the table",
    "intro": "31G was founded in 2023 by two industry leaders with more than twenty years delivering technology for the NHS, enterprise telecoms and regulated fintech. We built 31G to be the supplier we never managed to find: senior, accountable and honest about cost. Our headquarters are in Sheffield, with owned delivery capacity in Dubai and Islamabad and no middlemen anywhere in the chain.",
    "sections": [{
      "title": "Leadership",
      "lead": "Both founders remain hands on with client accounts, by design, not as a phase to grow out of.",
      "bullets": ["Hasib Aftab, CEO: former NHS and healthcare provider CIO who led large hospital and primary care digital transformation and scaled SaaS platforms", "Jarrar Hyder, CTO: enterprise architect with deep systems integration expertise, formerly a technical solutions architect at Telefonica O2"],
      "stat": {
        "value": "20+",
        "label": "years of delivery experience behind every engagement"
      }
    }, {
      "title": "Three offices, one company",
      "lead": "UK accountability sits over owned offshore delivery capacity, with no subcontracting layer.",
      "bullets": ["Sheffield, United Kingdom: headquarters, leadership, client management and contracts", "Dubai, United Arab Emirates: back office and regional client delivery", "Islamabad, Pakistan: our largest delivery centre for engineering and operations"],
      "stat": {
        "value": "3",
        "label": "offices we own and run, with no subcontracting layer between you and the team"
      }
    }, {
      "title": "How we behave",
      "lead": "Our values are quality, integrity, innovation and compassion, which come down to a few simple commitments.",
      "bullets": ["We quote honestly, including telling you about the things you do not need", "We employ and develop our people rather than renting them by the hour", "We answer every enquiry within one working day, including when the answer is bad news"],
      "stat": {
        "value": "2023",
        "label": "founded, and already trusted by clients across multiple markets"
      }
    }],
    "faqs": [{
      "q": "Where is 31G based?",
      "a": "Our headquarters are in Sheffield in the United Kingdom, with our own back offices in Dubai and Islamabad staffed by people we employ directly, giving owned delivery capacity rather than subcontractors."
    }, {
      "q": "Who founded 31G?",
      "a": "31G was founded in 2023 by Hasib Aftab, a former NHS and healthcare provider CIO, and Jarrar Hyder, an enterprise architect formerly at Telefonica O2. Both remain hands on with client accounts."
    }, {
      "q": "What is 31G's legal entity?",
      "a": "31G is the trading name of 31 Green Limited, registered in England, company number 14019513."
    }],
    "cta": "Come and see how we work. The coffee in Sheffield is better than you have heard."
  },
  "contact": {
    "slug": "contact",
    "name": "Contact",
    "url": "/contact/",
    "meta": {
      "title": "Contact 31G │ Get a Quote in One Working Day",
      "desc": "Contact 31G for a software development or BPO quote. We reply to every enquiry within one working day, with a founder or senior lead, never a sales rep.",
      "primary": "contact 31G",
      "schema": "LocalBusiness + ContactPage + BreadcrumbList"
    },
    "eyebrow": "CONTACT · GET A QUOTE",
    "h1": "Tell us what you need. We answer in one working day.",
    "intro": "Send a brief, a backlog, a job description or a cost line you want reduced. A founder or senior lead, never a sales development rep, will come back within one working day. Tell us the problem once and we will say honestly whether we are the right people, what a sensible approach looks like and roughly what it would cost.",
    "sections": [{
      "title": "How to reach us",
      "lead": "The fastest route to a useful answer is the outcome you want, a rough budget and your deadline.",
      "bullets": ["Phone: +44 20 3290 0012", "Email: info@31g.co.uk", "LinkedIn: linkedin.com/company/31green"],
      "stat": {
        "value": "1 day",
        "label": "to a straight answer on any brief, under English law contracts"
      }
    }, {
      "title": "What happens next",
      "lead": "We read every enquiry ourselves, so you hear from a senior person, not a chatbot.",
      "bullets": ["A senior lead reviews your enquiry, usually the same day", "We reply within one working day with next steps or a straight no", "If it is a fit, we scope and price quickly, with no pressure tactics"],
      "stat": {
        "value": "0",
        "label": "sales development reps between you and a real answer"
      }
    }, {
      "title": "What we can help with",
      "lead": "Whatever the discipline, the conversation starts the same way: tell us the outcome you are after.",
      "bullets": ["Bespoke software, AI and automation, SaaS and cloud", "NHS grade healthcare technology and integration", "Outsourced HR, finance, support, back office and marketing"],
      "stat": {
        "value": "4",
        "label": "disciplines under one accountable UK partner"
      }
    }],
    "faqs": [{
      "q": "How quickly will I hear back?",
      "a": "Within one working day, every time. A founder or senior lead replies personally, even when the honest answer is that we are not the right people."
    }, {
      "q": "Do I need a finished brief to get in touch?",
      "a": "No. A rough outline of the outcome you want, any budget and your deadline is plenty to start, and we help you shape the brief from there."
    }, {
      "q": "What information helps you give a useful first answer?",
      "a": "The outcome you want, a rough budget if you have one, and your deadline; with those three we can usually tell you on the first reply whether we are a fit."
    }, {
      "q": "Will I be talking to a salesperson or to the people doing the work?",
      "a": "To the people doing the work. The senior lead who scopes and prices the job is the same person who stays accountable for delivering it."
    }],
    "cta": "31 Green Limited. Registered in England, company number 14019513."
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
