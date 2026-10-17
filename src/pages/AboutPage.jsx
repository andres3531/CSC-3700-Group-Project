function AboutPage() {
    return (
        <div>
            <div className="container mt-4">
                <div className="card p-4">
                    <h1>About</h1>
                    <p>The Aurora CS Course Scheduler helps students track completed courses and prerequisites.</p>
                    <p>Authors: Jacob LASTNAME & Andres Alvarado</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Version: 1.0.0</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage