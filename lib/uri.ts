
function required(name: string, val?: string) {
	if (!val) throw new Error(`Missing required env var: ${name}`);
	return val;
}

// For client-side code in Next.js, env vars must be prefixed with NEXT_PUBLIC_
export const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_POINT ?? "";
export const UPLOAD_ENGINE = process.env.NEXT_PUBLIC_UPLOAD_ENGINE_POINT ?? "";

// Optional helper to assert presence during app startup (server-side usage)
export function getRequiredBackendUri() {
	return required("NEXT_PUBLIC_BACKEND_POINT", BACKEND_URI);
}

export function getRequiredUploadEngineUri() {
	return required("NEXT_PUBLIC_UPLOAD_ENGINE_POINT", UPLOAD_ENGINE);
}