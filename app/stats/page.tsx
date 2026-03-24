import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

interface Game {
  id: number;
  outcome: number;
  player1: number;
  player2: number;
  createdAt: Date;
}

function calculateStats(games: Game[]) {
  const player1Wins = games.filter((g) => g.outcome === 1).length;
  const player2Wins = games.filter((g) => g.outcome === 2).length;
  const draws = games.filter((g) => g.outcome === 0).length;

  return { player1Wins, player2Wins, draws, total: games.length };
}

function formatOutcome(outcome: number): string {
  if (outcome === 0) return "Draw";
  if (outcome === 1) return "Player 1 Wins";
  if (outcome === 2) return "Player 2 Wins";
  return "Unknown";
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function StatsPage() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
  });

  const stats = calculateStats(games);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-12 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Game Stats
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Game
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.player1Wins}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Player 1 Wins
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.player2Wins}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Player 2 Wins
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <span className="text-2xl font-bold text-zinc-600 dark:text-zinc-400">
              {stats.draws}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Draws
            </span>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Game History ({stats.total} games)
          </h2>
          {games.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400 text-center py-8">
              No games played yet. Start playing to see stats!
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Date
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Result
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 text-right">
                      Game ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {formatDate(game.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <span
                          className={
                            game.outcome === 1
                              ? "text-blue-600 dark:text-blue-400"
                              : game.outcome === 2
                                ? "text-red-600 dark:text-red-400"
                                : "text-zinc-600 dark:text-zinc-400"
                          }
                        >
                          {formatOutcome(game.outcome)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-400 dark:text-zinc-600 text-right">
                        #{game.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
