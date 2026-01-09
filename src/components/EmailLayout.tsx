import ContactForm from "./ContactForm";
import DarkToggle from "./DarkToggle";

export default function EmailLayout() {
    return (
        <div className="max-w-md mx-auto px-5 py-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    Email Dashboard
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Send emails
                </p>
            </header>

            {/* Card */}
            <main className="bg-card-light dark:bg-card-dark rounded-3xl p-6 ios-shadow border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <span className="material-icons-round rotate-[-45deg] text-2xl text-primary">
                        send
                    </span>
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                        Compose Email
                    </h2>
                </div>

                <ContactForm />
            </main>

            {/* Dark mode toggle */}
            <div className="mt-8 flex justify-center">
                <DarkToggle />
            </div>
        </div>
    );
}
