import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { FRAMEWORK } from "@/types";
import { TRPCError } from "@trpc/server";
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error(
    "GROQ_API_KEY is not defined in .env file. Please add it there (see README.md for more details).",
  );
}
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateRouter = createTRPCRouter({
  package: publicProcedure
    .input(
      z.object({
        framework: z.nativeEnum(FRAMEWORK),
        requirement: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { requirement, framework } = input;
      console.log({
        requirement,
        framework,
      });

      const prompt = `Find npm packages for ${requirement} and ${
        (framework as FRAMEWORK) === FRAMEWORK.NOT_SPECIFIED
          ? "any framework"
          : framework
      }. Make sure that the packages are compatible with ${framework} and are available on the node packgae manager. Make sure not to begin the result with any text like: 'Sure here, ...' and so on.`;

      if (!prompt) {
        // return new Response("No prompt in the request", { status: 400 });
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No prompt in the request",
        });
      }

      return groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a node package manager (npm) package finder. I will give you a requirement and a framework of my choice. You will recommend me npm packages (from 2 to 3 packages) for that requirement and framework. You will only find packages compatible with my framework. You will only find packages that are well-maintained, safe, and not depreciated. For example: if I ask you to find a package for date and time, you will suggest dayjs, not moment (moment is depreciated). You will provide a description within 25 words for each package. Make sure to only show name and description and nothing else, not even the intro text. Make sure to use the actual name of each package. You will not ask any further question. You will use the following templeate: 1. Package name: description.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: false,
        n: 1,
      });
    }),
});

export default generateRouter;