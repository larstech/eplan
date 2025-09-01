import JobEditPage from "@/features/job/components/edit-page"
import { Id } from "@/types/id"

type PageParams = Promise<{ jobId: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { jobId } = await params
  return <JobEditPage jobId={jobId} />
}
