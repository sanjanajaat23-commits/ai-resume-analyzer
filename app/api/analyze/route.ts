export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json();

  return Response.json({
    result: `
ATS Score: 82/100

Matching Skills:
- React.js
- Next.js
- Tailwind CSS
- GitHub
- API Integration
- Responsive UI

Missing Skills:
- Advanced SQL
- Testing
- Cloud Deployment
- Production-level backend experience

Strengths:
- Strong modern frontend stack
- AI/full-stack project experience
- Good project-based learning
- Clear SaaS project direction

Weaknesses:
- Needs stronger backend and database proof
- Needs deployed live links
- Needs measurable project impact
- Needs more real-world data handling

Final Suggestions:
- Add deployed project links
- Add GitHub links to resume
- Improve project descriptions with numbers
- Add dashboard project with charts
- Practice explaining API routes and frontend/backend flow

Compared Job Description:
${jobDescription ? "Job description added successfully." : "No job description provided."}

Resume Length:
${resume.length} characters
`
  });
}