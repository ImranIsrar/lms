
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import Layout from '../../components/resuable/widgets/Layout'
import filterCourse from '../../Services/filterCourse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCode, faFile, faFileCsv, faFileExcel, faFilePdf, faFilePowerpoint, faFileWord } from '@fortawesome/free-solid-svg-icons';


const MyClass = () => {

  // Image Path
  const imagePath = import.meta.env.VITE_IMAGES_PATH;
  const { title } = useParams();                                        // Get Params Title

  const [lecture, setLecture] = useState(0);                           // Lecture Completed
  const [video, setVideo] = useState(0);                        // Set VIdeo Id 
  const [myCourse, setMyCourse] = useState({});                        // Set Course
  const [isLoading, setIsLoading] = useState(false);                   // Check Course Is set

  // const youtubePlayerRef = useRef(null);

  // Get My Class
  useEffect(() => {
    console.log('my class');
      const getMyClass = () => {
        filterCourse.getMyClass(null)
          .then((res) => {
            console.log(res.data);
            setMyCourse(res.data);
            setIsLoading(true);
          })
          .catch((err) => {
            toast.error("Something went wrong!");
          })
      }
      getMyClass();
  }, [title]);

  // Set Lecture
  const { lessons } = myCourse;
  const handlePlayVideo = (index) => {
    setLecture(index);
  }

  // Video Configration
  const opts = {
    height: '672',
    width: '1196',
    playerVars: {
      autoplay: 0,
    },
  };

  
  // When Youtube video Ready
  const handlewhenReadyYoutube = (e) => {
   
    const player = e.target.pauseVideo();

    // Set up an interval to check video progress
    const checkVideoProgress = () => {
      const currentTime = player.getCurrentTime();
      const totalDuration = player.getDuration();
      const progress = (currentTime / totalDuration) * 100;

      // Stop checking once 90% is reached
      if (progress >= 90) {
        clearInterval(checkInterval); 
        setVideo(video + 1);
      }
    }
    const checkInterval = setInterval(checkVideoProgress, 1000);

    // Clear interval when component unmount
    return () => {
      clearInterval(checkInterval);
    }
  }

  // When Youtube Video End
  const handleWhenEndYoutube = (e) => {
    // console.log(e.target.getCurrentTime());
  }

  return (
    <>
      <Layout secClass="pt-70 pb-100" secContainerFluid={true}>
        <Row>
          {/* Single Video  */}
          <Col lg={9} md={8}>
            {
              isLoading ? (
                <div className="course-video">
                  <div className="mb-3">
                    {/* <iframe
                      width="1196"
                      height="672"
                      src={lessons[lecture].video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />getYouTubeID(lessons[lecture].video) */}
                    <YouTube 
                      videoId={lessons[lecture].video.split("/embed/")[1].split("?si")[0]}
                      opts={opts} 
                      className={"myclass-youtube-container"}
                      onReady={handlewhenReadyYoutube} 
                      onEnd={handleWhenEndYoutube}
                    />
                  </div>

                  <Tabs
                    defaultActiveKey="overview"
                    id="my-course"
                    className="single-course-tabs my-learning-courses bg-transparent"
                  >
                    <Tab eventKey="overview" title="Overview">
                      <div dangerouslySetInnerHTML={ {__html: lessons[lecture].overview}}></div>
                    </Tab>

                    <Tab eventKey="assets" title="Assets">
                      <Row className="justify-content-center">
                        {
                          lessons[lecture].assets &&
                            lessons[lecture].assets.map((item, index) => (
                              <Col lg={3} md={6} key={index}>
                                <Card className="course-assets text-center">
                                  <Card.Body>
                                    <div>
                                      {
                                        (() => {
                                          switch (item.file_type) {
                                            case 'pdf':
                                              return <FontAwesomeIcon icon={faFilePdf} />;
                                            case 'xlsx':
                                              return <FontAwesomeIcon icon={faFileExcel} />;
                                            case 'csv':
                                              return <FontAwesomeIcon icon={faFileCsv} />;
                                            case 'doc':
                                              return <FontAwesomeIcon icon={faFileWord} />;
                                            case 'docx':
                                              return <FontAwesomeIcon icon={faFileWord} />;
                                            case 'txt':
                                              return <FontAwesomeIcon icon={faFileWord} />;
                                            case 'html':
                                              return <FontAwesomeIcon icon={faCode} />;
                                            case 'ppt':
                                              return <FontAwesomeIcon icon={faFilePowerpoint} />;
                                            default:
                                              return <FontAwesomeIcon icon={faFile} />;
                                          }
                                        })()
                                      }
                                    </div>

                                    <h5>{item.name}</h5>
                                    <Button variant="success" as="a" href={`${item.file_url}`} target="_blank" className="mt-2">Download</Button>
                                  </Card.Body>
                                </Card>
                              </Col>
                          ))
                        }
                      </Row>
                    </Tab>

                    <Tab eventKey="discussion" title="Discussion">
                      <h3>Course Discussion Coming Soon...</h3>
                      {/* <Form className="mb-30">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="d-none">comment</Form.Label>
                          <Form.Control type="text" placeholder="Leave a constructive comment..." />
                        </Form.Group>
                        <Button type="submit">Leave a Comment</Button>
                      </Form> */}

                      {/* Comment Display Here */}
                      {/* <div className="comment-box">
                        <Card className="bg-white border-0 course-card select-course">
                          <Card.Body>
                            <div className="comment-box-head mb-30 d-flex flex-wrap justify-content-between align-items-center">
                              <div className="comment-box-user">
                                <div className="d-flex flex-wrap align-items-center">
                                  <div className="me-3">
                                    <img src={`${imagePath}/author-1.jpg`} width="50" height="50" className="rounded-circle" />
                                  </div>

                                  <div>
                                    <h5 className="mb-0">@naseema</h5>
                                    <p className="mb-0"><i>5 days ago</i></p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="comment-box-comments">
                                <Badge pill>
                                  <FontAwesomeIcon icon={faHeart} />
                                  {'55'}
                                </Badge>
                              </div>
                            </div>

                            <div className="comment-box-body">
                              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt iure numquam nemo placeat facere rem vero, modi quam sapiente autem, nulla, laudantium laboriosam et veniam odio error eum? Laudantium, et.</p>
                            </div>
                          </Card.Body>
                        </Card>
                      </div> */}
                    </Tab>

                    <Tab eventKey="leave-a-rating" title="Leave a rating">
                      <h3>Course Rating Coming Soon...</h3>
                    </Tab>

                    <Tab eventKey="leave-a-feedback" title="Leave a feedback">
                      <h3>Course Feedback Coming Soon...</h3>
                    </Tab>
                  </Tabs>
                </div>
              ) : (
                <h2>Loading ...</h2>
              )
            }

          </Col>

          {/* LIst of Videos */}
          <Col lg={3} md={4}>
            <div className="course-sidebar position-sticky">
              <div className="mb-3">
                <p>Your progress <strong>{video} of {myCourse.lecture} complete</strong> .
                  <span>Get certificate after complete</span>
                </p>
                <ProgressBar now={`${(parseInt(video) / parseInt(myCourse.lecture)) * 100}`}  />
              </div>

              <div className="course-videos my-learning-course shadow-none">
                <h5 className="text-capitalize">{title.replace(/-/g, ' ')}</h5>

                <div className="course-videos-list">
                  {
                    lessons && 
                      lessons.map((item, index) => (
                        <Card className={`border-0 ${lecture == index ? 'lecture-play' : ''}`} key={item.id}
                          onClick={() => lecture != index ? handlePlayVideo(index) : undefined}
                        >
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip id={`button-tooltip-${item.id}`}>{item.name}</Tooltip>}
                          >
                            <Card.Body>
                              <h6>{index + 1}. {item.name.length >= 40 ? item.name.slice(0, 40) + '...' : item.name}</h6>
                              <div className="d-flex align-items-center timestamp">
                                <div>
                                  <FontAwesomeIcon icon={faCirclePlay} className="pe-1" style={{ fontSize: '14px' }} />
                                </div>
                                <div>{item.duration}</div>
                              </div>
                            </Card.Body>
                          </OverlayTrigger>
                        </Card>
                      ))
                  }
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default MyClass
