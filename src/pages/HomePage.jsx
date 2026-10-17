import useFetch from "../hooks/useFetch.js";

function HomePage() {
    const URL = import.meta.env.VITE_API_BASE_URL;

    const { data , isPending, error } = useFetch(`${URL}/courses`);
    const courses = Array.isArray(data) ? data : []
    return (
        <>
            <div className="container mt-4">
                <h1>CS Developer Track</h1>
                {isPending && <p>Loading....</p>}
                {error && <p className="text-danger">{String(error)}</p>}

                {courses.length > 0 && (
                    <div className="row g-3">
                        {courses.map(course => (
                            <div className="col-md-4" key={course.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{course.number}</h5>
                                        <p className="card-text">{course.title}</p>
                                        <p className="card-text">{course.credits} credits</p>
                                        <p className="card-text">{course.description}</p>
                                        <p className="card-text">Prerequisites: {course.prerequisites}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default HomePage;