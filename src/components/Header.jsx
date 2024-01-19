import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { useState } from "react";
import useTheme from "../context/theme";

const Header = () => {
  const [inputText, setInputText] = useState('print("Made with Aasif khan")');
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const [cpuTime, setCpuTime] = useState("");
  const [memory, setMemory] = useState("");
  const [buttonClick, setButtonClick] = useState(false);

  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: "https://online-code-compiler.p.rapidapi.com/v1/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "be91e15743mshd2c18dc05c1197bp13c572jsn7042166fb3f2",
        "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
      },
      data: {
        language: language,
        version: "latest",
        code: inputText,
        input: null
      },
    };

    try {
      setButtonClick(true);
      const response = await axios.request(options);
      setButtonClick(false);
      setCpuTime(response.data.cpuTime);
      setMemory(response.data.memory);
      setOutput(response.data.output);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const languageChange = () => {
    let e = document.getElementById('lan');
    setLanguage(e.value);
    console.log(e.value);
    if(e.value === "cpp"){
      setInputText(`// Your First C++ Program
#include <iostream>      
int main() {
  std::cout << "Hello World!";
      return 0;
}
   `);
    }
    else if(e.value === "python3"){
      setInputText("print(\"Hello World!\")");
    }
    else if(e.value === "c"){
      setInputText(`#include <stdio.h>
int main() {
  printf("Hello, World!");
    return 0;
}
      `);
    }

  }
  return (
    <>
      <div className="flex flex-row justify-between p-5 text-3xl dark:bg-slate-900 dark:text-white">
        <h1 className="font-bold">
          Code Compiler Pro
          <span className="text-red-500 font-bold">IDE ☠️</span>
        </h1>

        <a
          href="https://github.com/akay41024/online-code-compiler"
          rel="noreferrer"
          target="_blank"
          className="ml-auto text-xl bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded flex justify-end items-center gap-1"
        >
          <FaGithubSquare className="text-3xl" />
          <h2 className="font-semibold flex place-items-center">Github</h2>
        </a>
        <label className="relative inline-flex items-center cursor-pointer ml-5">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={onChangeBtn}
            checked={themeMode == "dark"}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
          <span className="ms-3 text-sm font-medium dark:text-slate-300">
            Toggle Theme
          </span>
        </label>
      </div>
      <form onSubmit={handleSubmit} className="" method="post">
        <Editor
          className="mt-3 mx-4 text-black dark:bg-slate-900 dark:text-white shadow-2xl shadow-slate-700"
          value={inputText}
          onValueChange={(code) => setInputText(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
            minHeight: "300px"
          }}
        />
        {buttonClick ? (
          <button
            className="bg-red-500 py-2 px-4 rounded text-white mt-2 flex flex-row mr-6 ml-auto justify-center items-center gap-2"
            type="submit"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-1 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>{" "}
            <span className="font-semibold"> Running Code</span>
          </button>
        ) : (
          <button
            className="bg-red-600 py-2 px-4 rounded text-white mt-4 flex flex-row mr-6 ml-auto justify-center items-center gap-2"
            type="submit"
          >
            <FaPlay /> <span className="font-semibold"> Run Code</span>
          </button>
        )}

        <div className=" flex relative items-center ml-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:text-white text-black absolute top-[10px] mx-3"
            data-name="Languages"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipPath="evenodd"
              d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
              fill="currentColor"
            ></path>
          </svg>

          <select
            name="lan"
            id="lan"
            className="dark:bg-slate-900 dark:text-white  text-black border border-gray-500  rounded sm:p-[6px_36px]  appearance-none sm:h-[37px] "
            onChange={languageChange}
          >
            <option value="python3">python3</option>
            <option value="cpp">c++</option>
            <option value="c">c</option>
          </select>
        </div>
      </form>
        

      {output && cpuTime && memory && (
        <div className="flex flex-col shadow-lg dark:bg-slate-900 border-2 rounded p-2 mt-6">
          <h1 className="text-2xl font-bold dark:text-white">Output:</h1>
          <p className="text-green-500 text-xl font-mono py-2">{output}</p>

          <div className="flex flex-row justify-evenly gap-4">
            <h3 className="w-1/2 text-center flex flex-col gap-1 justify-center items-center dark:bg-gray-800 rounded dark:text-white h-32 text-xl">
              <h2 className="font-bold">CPU used: </h2>{" "}
              <h1 className="text-3xl text-green-500">
                {cpuTime}
                <span className="text-3xl text-green-400">%</span>
              </h1>
            </h3>
            <h3 className="w-1/2 text-center flex flex-col gap-1 justify-center items-center dark:bg-gray-800 rounded dark:text-white h-32 text-xl">
              <h2 className="font-bold">MEMORY used: </h2>{" "}
              <h1 className="text-3xl text-green-500">
                {memory}
                <span className="text-3xl text-green-400">kb</span>
              </h1>
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
