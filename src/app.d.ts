
declare namespace App {
    import type PocketBase from "pocketbase";
    import type {User} from "$lib/schemas/user";

    interface Locals {
        pocketbase: PocketBase;
        user: User | undefined;
    }
    interface PageData {
        flash?: { type: 'success' | 'error'; message: string };
    }

    interface Error {
        message: string;
    }
}
