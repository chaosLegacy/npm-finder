import { z } from "zod";
import { load } from "cheerio";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const packageRouter = createTRPCRouter({
  getPackage: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name } = input;

      if (!name) throw new Error("No package name provided");

      const url = `https://www.npmjs.com/package/${name}`;
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);

      const repository = $("#repository-link").text();
      const downloads = $("._9ba9a726").text();
      const unpackedSize = $(
        'p[class="f2874b88 fw6 mb3 mt2 truncate black-80 f4"]',
      )
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          (_, el) => $(el).text().includes("kB") || $(el).text().includes("MB"),
        )
        .text();
      const lastPublish = $("time").attr("datetime");

      return {
        name,
        repository,
        downloads,
        unpackedSize,
        lastPublish,
      };
    }),
});

export default packageRouter;