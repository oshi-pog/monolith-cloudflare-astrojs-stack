import { trpc } from '@/lib/trpc';

export function Greeting() {
    const hello = trpc.hello.useQuery({ name: 'Josh' });

    if (!hello.data) return <div>Loading...</div>;

    return (
        <div className="p-4 border rounded bg-card text-card-foreground">
            <p className="text-lg font-bold">{hello.data.greeting}</p>
        </div>
    );
}
