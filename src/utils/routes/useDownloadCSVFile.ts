import { AxiosResponse } from "axios";
import { logger } from "../../logger/logger";
import { IconTypeEnum } from "../../notification/enum";
import { openNotificationWithIcon } from "../../notification/openNotificationWithIcon";

export interface CsvFileResponse {
  fileName: string;
  fileBlob: Blob;
  mimeType: string;
  downloadUrl: string;
}

export const useDownloadCSVFile = (
  SuccessMessageDescription: string,
  ErrorMessageDescription: string
) => {
  const downloadFile = (response: AxiosResponse<Blob>, fileName: string) => {
    try {
      const fileBlob = new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(fileBlob);

      const file: CsvFileResponse = {
        fileName,
        fileBlob,
        mimeType: "text/csv",
        downloadUrl,
      };

      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(file.downloadUrl);
      openNotificationWithIcon(IconTypeEnum.Success, {
        description: SuccessMessageDescription,
      });
    } catch (error) {
      logger.error(`Failed to export file ${error}`);
      openNotificationWithIcon(IconTypeEnum.Error, {
        description: ErrorMessageDescription,
      });
    }
  };

  return { downloadFile };
};
