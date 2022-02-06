(() => { "use strict"; const t = () => System.import("./lazy-module");
  setTimeout((() => { t.then((t => {})) }), 300) })();