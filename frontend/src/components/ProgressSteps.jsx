import { useTranslation } from "react-i18next";


const ProgressSteps = ({ step1, step2, step3 }) => {
  const {t} = useTranslation ();
    return (
      <div className="flex justify-center items-center font-bold space-x-4  p-[5rem]"
      style={{ fontFamily: '"Nerko One",' }}>
        <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
          <span className="ml-2">{t("Login")}</span>
          <div className="mt-2 text-lg text-center ">✅</div>
        </div>
  
        {step2 && (
          <>
            {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
            <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
              <span>{t("Shipping")}</span>
              <div className="mt-2 text-lg text-center">✅</div>
            </div>
          </>
        )}
  
        <>
          {step1 && step2 && step3 ? (
            <div className="h-0.5 w-[10rem] bg-green-500"></div>
          ) : (
            ""
          )}
  
          <div className={`${step3 ? "text-green-500" : "text-gray-400"}`}>
            <span className={`${!step3 ? "ml-[10rem]" : ""}`}>{t("Summary")}</span>
            {step1 && step2 && step3 ? (
              <div className="mt-2 text-lg text-center">✅</div>
            ) : (
              ""
            )}
          </div>
        </>
      </div>
    );
  };
  
  export default ProgressSteps;