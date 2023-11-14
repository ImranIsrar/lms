
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import InnerBaner from "../../components/resuable/InnerBaner";
import Layout from "../../components/resuable/widgets/Layout";
import CourseIntroduction from "../../components/CourseIntroduction";




const SingleCourse = () => {

  const { title } = useParams();
  const newTitle = title.replace(/-/g, ' ');
  
  const breadCurmbNav = useMemo(() => [
    { "name": 'home', "slug": "/" },
    {
      "name": 'course', "slug": "/course",
      "branch": {
        "name": title
      }
    }
  ], []);

  return (
    <>
      <InnerBaner
        heading={newTitle}
        breadcurmb={breadCurmbNav}
      />

      <Layout secClass="single-course-intro pt-100 pb-100">
        <CourseIntroduction title={title} />
      </Layout>
    </>
  )
}

export default SingleCourse
