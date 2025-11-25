(() => {
  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: "home", scope: "root", path: "index.html" },
    { id: "pr", label: "PR Date Proposals", icon: "rebase", scope: "base", path: "pr_date_proposal_1/code.html" },
    { id: "pair", label: "Pair Programming", icon: "terminal", scope: "base", path: "pair-programming_speed_dating_1/code.html" },
    { id: "open-issue", label: "Open Issue Flirting", icon: "bug_report", scope: "base", path: "open_issue_flirting_1/code.html" },
    { id: "profile", label: "Profile", icon: "person", scope: "base", path: "user_profile_1/code.html" },
    { id: "stack", label: "Stack Compatibility", icon: "settings", scope: "base", path: "settings/compatibility_breakdown_1/code.html" },
  ];

  const createLink = (item, pageId, basePrefix, rootPrefix) => {
    const link = document.createElement("a");
    const targetPrefix = item.scope === "root" ? rootPrefix : basePrefix;
    link.href = targetPrefix + item.path;
    link.className = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
    link.dataset.nav = item.id;

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined text-lg";
    icon.textContent = item.icon;

    const label = document.createElement("p");
    label.textContent = item.label;

    const isActive = pageId === item.id;
    if (isActive) {
      link.classList.add("bg-indigo-500/20", "text-white");
      icon.classList.add("text-white");
    } else {
      link.classList.add("text-white/70", "hover:bg-white/10", "hover:text-white");
      icon.classList.add("text-white/60");
      label.classList.add("text-white/70");
    }

    link.append(icon, label);
    return link;
  };

  const buildSidebar = (body) => {
    if (body.dataset.sidebarInjected === "true") return;
    body.dataset.sidebarInjected = "true";

    const pathParts = window.location.pathname.split("stitch_main_dashboard/");
    if (pathParts.length < 2) return;
    const relativePath = pathParts[1];
    const dirSegments = relativePath.split("/").slice(0, -1).filter(Boolean);
    const basePrefix = dirSegments.length === 0 ? "./" : "../".repeat(dirSegments.length);
    const rootPrefix = "../".repeat(dirSegments.length + 1);

    const pageId = body.dataset.page || "";

    const shell = document.createElement("div");
    shell.className = "relative flex min-h-screen w-full";

    const inner = document.createElement("div");
    inner.className = "flex h-full min-h-screen w-full bg-slate-950 text-white";

    const aside = document.createElement("aside");
    aside.className = "flex w-64 flex-col gap-8 border-r border-slate-800 bg-slate-900 p-4";

    const brand = document.createElement("div");
    brand.className = "flex items-center gap-2 px-2";
    const brandText = document.createElement("h1");
    brandText.className = "font-mono text-xl font-bold text-white";
    brandText.textContent = "Git Together";
    brand.appendChild(brandText);

    const navWrapper = document.createElement("div");
    navWrapper.className = "flex flex-col gap-2";
    NAV_ITEMS.forEach((item) => navWrapper.appendChild(createLink(item, pageId, basePrefix, rootPrefix)));

    const userBlock = document.createElement("div");
    userBlock.className = "flex flex-col gap-1 border-t border-white/10 pt-4";
    const userRow = document.createElement("div");
    userRow.className = "flex items-center gap-4";
    const avatar = document.createElement("div");
    avatar.className = "h-10 w-10 rounded-full bg-cover bg-center";
    avatar.style.backgroundImage =
      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9nouSPUfFz4sr7L6QA9gs7m_OsusDuhV9hDQ1ZwSoCDL2hT7GlEt-2Cvg5qXb2AYxzgSSZI6LuXFZ-Ud_ztMPmrda0T4I_mM6Cuhp6GwRA01wJcBiBTYNeWmLTUVSMtNLvsHS6T4vHuHpE_Ph9OeNvuZrXM_4Ps9HmSpx__QRncBaQk-dfI_pldHDc4BhcaXj_AIBzE7SuMCodfhqM6Uli05yrmu5VIcn0cNlREFgbDP3IRr6IAnbJIvUlOP2TomzWktVUVtXRkM')";
    const userMeta = document.createElement("div");
    const userName = document.createElement("h2");
    userName.className = "text-base font-medium text-white";
    userName.textContent = "git-user";
    const userStatus = document.createElement("p");
    userStatus.className = "text-sm text-white/60";
    userStatus.textContent = "Online";
    userMeta.append(userName, userStatus);
    userRow.append(avatar, userMeta);
    userBlock.appendChild(userRow);

    aside.append(brand, navWrapper, userBlock);

    const main = document.createElement("main");
    main.className = "flex-1 overflow-y-auto bg-slate-950";

    const contentWrapper = document.createElement("div");
    while (body.firstChild) {
      contentWrapper.appendChild(body.firstChild);
    }

    main.appendChild(contentWrapper);
    inner.append(aside, main);
    shell.appendChild(inner);
    body.appendChild(shell);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => buildSidebar(document.body));
  } else {
    buildSidebar(document.body);
  }
})();

