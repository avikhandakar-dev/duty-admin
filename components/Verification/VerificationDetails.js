import moment from "moment";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const VerificationDetails = ({ verification }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="card w-full bg-base-200 shadow-xl overflow-hidden h-full border border-success rounded">
      <div className="px-4 capitalize py-3 bg-success text-success-content card-title">
        {verification.type.toLowerCase()} Verification
      </div>
      <div className="card-body">
        {verification.type === "INDIVIDUAL" && (
          <>
            <div className="flex justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold">Name</span>
              <span className=" opacity-50">{`${verification.firstName} ${verification.lastName}`}</span>
            </div>
            <div className="flex justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold">Gender</span>
              <span className=" opacity-50">{verification.gender}</span>
            </div>
            <div className="flex justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold">DOB</span>
              <span className=" opacity-50">{verification.dob}</span>
            </div>
          </>
        )}
        {verification.type === "COMPANY" && (
          <>
            <div className="flex justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold">Company Name</span>
              <span className=" opacity-50">{`${verification.companyName}`}</span>
            </div>
          </>
        )}

        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Accepted</span>
          <input
            type="checkbox"
            className="toggle toggle-primary pointer-events-none"
            defaultChecked={verification.accept}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Rejected</span>
          <input
            type="checkbox"
            className="toggle toggle-primary pointer-events-none"
            defaultChecked={verification.reject}
          />
        </div>
        <div className="flex justify-between border-b pb-1 border-slate-800">
          <span className="font-semibold">Submited</span>
          <span className=" opacity-50">
            {moment(verification.createdAt).format("Do MMMM, h:mm A")}
          </span>
        </div>
        {verification.type === "INDIVIDUAL" && (
          <>
            <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold text-yellow-500">
                Present Address
              </span>
              <div className="flex justify-between">
                <span className="font-semibold">Division</span>
                <span className=" opacity-50">
                  {verification.presentDivision}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">District</span>
                <span className=" opacity-50">
                  {verification.presentDistrict}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Thana</span>
                <span className=" opacity-50">{verification.presentThana}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Postal Code</span>
                <span className=" opacity-50">
                  {verification.presentPostalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address</span>
                <span className=" opacity-50">
                  {verification.presentAddress}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold text-yellow-500">
                Permanent Address
              </span>
              <div className="flex justify-between">
                <span className="font-semibold">Division</span>
                <span className=" opacity-50">
                  {verification.permanentDivision || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">District</span>
                <span className=" opacity-50">
                  {verification.permanentDistrict || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Thana</span>
                <span className=" opacity-50">
                  {verification.permanentThana || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Postal Code</span>
                <span className=" opacity-50">
                  {verification.permanentPostalCode || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address</span>
                <span className=" opacity-50">
                  {verification.permanentAddress || "-"}
                </span>
              </div>
            </div>
          </>
        )}

        {verification.type === "COMPANY" && (
          <>
            <div className="flex flex-col justify-between border-b pb-1 border-slate-800">
              <span className="font-semibold text-yellow-500">
                Company Address
              </span>
              <div className="flex justify-between">
                <span className="font-semibold">Division</span>
                <span className=" opacity-50">
                  {verification.companyDivision}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">District</span>
                <span className=" opacity-50">
                  {verification.companyDistrict}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Thana</span>
                <span className=" opacity-50">{verification.companyThana}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Postal Code</span>
                <span className=" opacity-50">
                  {verification.companyPostalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address</span>
                <span className=" opacity-50">
                  {verification.companyAddress}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationDetails;
