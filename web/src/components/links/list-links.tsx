import { LinksHeader } from "./links-header";
import { LinksLoading } from "./links-loading";
import { LinksError } from "./links-error";
import { LinksList } from "./links-list";
import { useLinks, useDownloadReport } from "@/hooks/use-links";

export function MyLinks() {
  const { data, isLoading, error } = useLinks();
  const downloadReport = useDownloadReport();

  function handleDownloadReport() {
    downloadReport.mutate();
  }

  if (isLoading) {
    return <LinksLoading onDownload={handleDownloadReport} loading={downloadReport.isPending} />;
  }

  if (error) {
    return <LinksError onDownload={handleDownloadReport} loading={downloadReport.isPending} />;
  }

  const links = data?.links || [];

  return (
    <section
      aria-labelledby="lista-links-heading"
      className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8"
    >
      <LinksHeader
        onDownload={handleDownloadReport}
        disabled={downloadReport.isPending || links.length === 0}
        loading={downloadReport.isPending}
      />
      <LinksList links={links} />
    </section>
  );
}