"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Toaster } from "react-hot-toast";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
        >
            {children}
            <Toaster position="top-right" />
        </GoogleReCaptchaProvider>
    );
}
