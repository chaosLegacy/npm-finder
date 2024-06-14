type GroqModel =
  | "gemma-7b-it"
  | "llama3-70b-8192"
  | "llama3-8b-8192"
  | "mixtral-8x7b-32768";

type ChatGPTAgent = "user" | "system";

type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

enum FRAMEWORK {
  NOT_SPECIFIED = "Not specified",
  REACT = "React.js",
  SVELTE = "Svelte",
  VUE = "Vue.js",
  ANGULAR = "Angular",
  EXPRESS = "Express",
}

type Package = {
  name?: string;
  repository?: string;
  downloads?: string;
  unpackedSize?: string;
  lastPublish?: string;
};

type PkgData = {
  start: string;
  end: string;
  package: string;
  downloads: PkgDownload[];
};

type PkgDownload = {
  downloads: number;
  day: string;
};

type ChartDataNivo = {
  id: string;
  color?: string;
  data: {
    x: string;
    y: number;
  }[];
};

enum DURATION {
  LAST_WEEK = "last-week",
  LAST_MONTH = "last-month",
  LAST_YEAR = "last-year",
}


export type { GroqModel, ChatGPTMessage };
export {FRAMEWORK}