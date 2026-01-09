"use client";

export default function DarkToggle() {
    const toggle = () => {
        const root = document.documentElement;
        root.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            root.classList.contains("dark") ? "dark" : "light"
        );
    };

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block">light_mode</span>
        </button>
    );
}
