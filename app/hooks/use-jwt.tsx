import { Buffer } from "buffer"

function useJwt(token: string) {
    const parts: Buffer[] = token.split('.').map((part: string): Buffer => {
        return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    });
    const payload = JSON.parse(parts[1].toString());
    

    return payload;
}

export default useJwt;