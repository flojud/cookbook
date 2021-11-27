import { UserInfo, UserMetadata } from "@firebase/auth";

export class User{

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: UserMetadata;
    providerData: UserInfo[];
    refreshToken: string;
    tenantId: string | null;

}