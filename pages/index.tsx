import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { Logo } from "../shared/icons/icons";
import { GET_POSTS } from "./queries/queries";
import { client } from "./_app";
interface IPosts {
  title: string;
  content: string;
  slug: string;
  voteUp: number;
  voteDown: number;
  viewCount: number;
  ownerUserId: {
    username: string;
  };
  categoryId: {
    name: string;
  };
  createdAt: Date;
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  return { props: { data } };
};

function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        <div className="rounded overflow-hidden shadow-lg">
          <div>
            <div className="relative" style={{ height: "100px" }}>
              <Image
                className="w-full h-full"
                src={Logo}
                alt="Sunset in the mountains"
              />
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              <a href="#!">
                <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                  Photos
                </div>
              </a>
              <a href="!#">
                <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                  <span className="font-bold">27</span>
                  <small>March</small>
                </div>
              </a>
            </div>
          </div>
          <div className="px-6 py-4">
            <a
              href="#"
              className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              Best View in Newyork City
            </a>
            <p className="text-gray-500 text-sm">The city that never sleeps</p>
          </div>
          <div className="px-6 py-4 flex flex-row items-center">
            <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
              <svg
                height="13px"
                width="13px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
			c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                    />
                  </g>
                </g>
              </svg>
              <span className="ml-1">6 mins ago</span>
            </span>
            <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="ml-1">Hien Pham</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
