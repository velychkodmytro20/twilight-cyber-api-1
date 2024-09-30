"use client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { CyberInfectionClientService } from "@services/client/cyber-client.service";
import { removeProtocolAndTrailingSlash } from "@helpers/remove-protocol.helper";
import { SearchPageForm } from "./search-page-form";
import DomainResultsTable from "../domain-result-table/domain-results-table";
import {
  updatePage,
  updatePagination,
} from "./helpers/update-pagination.helpers";

export const SearchPage = ({
  user,
}: {
  user: { name: string; email: string; credits: number };
}) => {
  const [domains, setDomains] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 5,
  });
  const [credentialPagination, setCredentialPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 3,
  });
  const [mainInfoPagination, setMainInfoPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 3,
  });

  const handleChange = (index: number, event: any) => {
    const newDomains = [...domains];
    newDomains[index] = event.target.value;
    setDomains(newDomains);
  };

  const handleAddDomain = () => {
    if (domains.length < 5) {
      setDomains([...domains, ""]);
    }
  };

  const handleRemoveDomain = (index: number) => {
    const newDomains = domains.filter((_, i) => i !== index);
    setDomains(newDomains);
  };

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const clearDomainsProtocols = domains.map(removeProtocolAndTrailingSlash);

      const { status, data, error } =
        await CyberInfectionClientService.getDomainInfections({
          domains: clearDomainsProtocols,
        });

      if (status === "FAILED") {
        toast.error(error.message);
        return;
      }

      setResults(data || []);

      updatePagination(
        data,
        setPagination,
        setCredentialPagination,
        setMainInfoPagination
      );

      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [domains]);

  return (
    <div className="flex h-full w-full bg-gray-100">
      {isSubmitted ? (
        <div className="w-full p-6">
          <DomainResultsTable
            apiResponseData={results}
            computerPagination={pagination}
            credentialsPagination={credentialPagination}
            mainInfoPagination={mainInfoPagination}
            onComputerPageChange={(page) => updatePage(page, setPagination)}
            onCredentialsPageChange={(page) =>
              updatePage(page, setCredentialPagination)
            }
            onMainInfoPageChange={(page) =>
              updatePage(page, setMainInfoPagination)
            }
          />
        </div>
      ) : (
        <div className="flex h-screen w-full justify-center items-center">
          <div className="p-6 bg-white rounded-lg w-1/2 shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">User Information</h2>
              <div>
                <div>
                  <strong>Name:</strong> {user?.name}
                </div>
                <div>
                  <strong>Email:</strong> {user?.email}
                </div>
              </div>
            </div>

            <SearchPageForm
              domains={domains}
              handleChange={handleChange}
              handleRemoveDomain={handleRemoveDomain}
              handleAddDomain={handleAddDomain}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
