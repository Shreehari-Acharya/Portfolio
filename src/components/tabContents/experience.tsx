import { experiences } from "../../contents/experience.json"
import ExperienceCard from "../experience-card.tsx";

export default function Experience() {
    return (
        <div className={`grid ${experiences.length > 1 ? "md:grid-cols-2" : ""} place-items-center `}

        >
            {experiences.map((item, idx) => (
                <ExperienceCard
                    key={idx}
                    companyName={item.companyName}
                    companyLogo={item.companyLogo}
                    companyUrl={item.companyUrl}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    role={item.role}
                    employmentType={item.employmentType}
                    responsibilities={item.responsibilities}
                    stack={item.stack}
                />
            ))}
        </div>
    )
}
