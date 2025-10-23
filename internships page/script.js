const internshipDetails = {
    web: {
        title: "Web Development Internship Program",
        description: "Immerse yourself in the world of modern web development. Master cutting-edge technologies and frameworks while building real-world projects that will make your portfolio stand out in the competitive tech industry.",
        details: [
            { icon: "fas fa-clock", text: "Duration: 1 month/2 months" },
            { icon: "fas fa-map-marker-alt", text: "Location: Virtual (Remote)" },
            { icon: "fas fa-money-bill-wave", text: "Stipend: Performance Based + Certificates" },
            { icon: "fas fa-calendar-alt", text: "Start date: 05/11/2023" },
            { icon: "fas fa-laptop-code", text: "Technologies: HTML5, CSS3, JavaScript, React.js, Node.js, MongoDB" },
            { icon: "fas fa-tasks", text: "Projects: 5+ Real-world projects including E-commerce sites and Web Apps" },
            { icon: "fas fa-chart-line", text: "Outcome: Job-ready portfolio and industry mentorship" },
            { icon: "fas fa-users", text: "Mentorship: Weekly 1:1 sessions with senior developers" },
            { icon: "fas fa-certificate", text: "Certification: Industry-recognized completion certificate" },
            { icon: "fas fa-briefcase", text: "Career Support: Resume review and interview preparation" }
        ],
        link: "https://example.com/web-development-internship"
    },
    app: {
        title: "App Development Internship Program",
        description: "Transform your app ideas into reality. Learn mobile development for both Android and iOS platforms with hands-on experience in UI/UX design, API integration, and app deployment strategies.",
        details: [
            { icon: "fas fa-clock", text: "Duration: 1 month/2 months" },
            { icon: "fas fa-map-marker-alt", text: "Location: Virtual (Remote)" },
            { icon: "fas fa-money-bill-wave", text: "Stipend: Performance Based + Certificates" },
            { icon: "fas fa-calendar-alt", text: "Start date: 05/11/2023" },
            { icon: "fas fa-mobile-alt", text: "Platforms: Android, iOS, React Native, Flutter" },
            { icon: "fas fa-tasks", text: "Projects: 4+ Functional mobile apps with backend integration" },
            { icon: "fas fa-rocket", text: "Bonus: App Store deployment guidance" },
            { icon: "fas fa-palette", text: "UI/UX: Design principles and prototyping tools" },
            { icon: "fas fa-database", text: "Backend: Firebase integration and API development" },
            { icon: "fas fa-cloud-upload-alt", text: "Deployment: App store submission process" }
        ],
        link: "https://example.com/app-development-internship"
    },
    python: {
        title: "Python Programming Internship Program",
        description: "Unlock the power of Python in data science, automation, and web development. Work on industry-relevant projects that demonstrate your problem-solving skills and technical expertise.",
        details: [
            { icon: "fas fa-clock", text: "Duration: 1 month/2 months" },
            { icon: "fas fa-map-marker-alt", text: "Location: Virtual (Remote)" },
            { icon: "fas fa-money-bill-wave", text: "Stipend: Performance Based + Certificates" },
            { icon: "fas fa-calendar-alt", text: "Start date: 05/11/2023" },
            { icon: "fab fa-python", text: "Focus: Data Analysis, Automation, Django/Flask Web Development" },
            { icon: "fas fa-tasks", text: "Projects: Data processing scripts, REST APIs, ML models, Web apps" },
            { icon: "fas fa-database", text: "Tools: Pandas, NumPy, Scikit-learn, Django REST Framework" },
            { icon: "fas fa-robot", text: "Automation: Web scraping and task automation" },
            { icon: "fas fa-chart-bar", text: "Data Visualization: Matplotlib, Seaborn, Plotly" },
            { icon: "fas fa-server", text: "Deployment: Cloud deployment and CI/CD pipelines" }
        ],
        link: "https://example.com/python-internship"
    },
    java: {
        title: "Java Programming Internship Program",
        description: "Build robust enterprise-level applications with Java. Master object-oriented programming, design patterns, and software development best practices that are valued in top tech companies.",
        details: [
            { icon: "fas fa-clock", text: "Duration: 1 month/2 months" },
            { icon: "fas fa-map-marker-alt", text: "Location: Virtual (Remote)" },
            { icon: "fas fa-money-bill-wave", text: "Stipend: Performance Based + Certificates" },
            { icon: "fas fa-calendar-alt", text: "Start date: 05/11/2023" },
            { icon: "fab fa-java", text: "Technologies: Java, Spring Boot, Maven, JUnit, Hibernate" },
            { icon: "fas fa-tasks", text: "Projects: Console apps, REST APIs, Database integration, Microservices" },
            { icon: "fas fa-users", text: "Mentorship: 1:1 sessions with industry experts" },
            { icon: "fas fa-code-branch", text: "Version Control: Git and collaborative development" },
            { icon: "fas fa-cloud", text: "Cloud: AWS/Google Cloud deployment" },
            { icon: "fas fa-shield-alt", text: "Security: Application security best practices" }
        ],
        link: "https://example.com/java-internship"
    }
};

const modal = document.getElementById('detailsModal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close-btn');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

function openModal(category) {
    const internship = internshipDetails[category];
    
    modalTitle.textContent = internship.title;
    
    let contentHTML = `
        <div class="modal-description">
            <p>${internship.description}</p>
        </div>
        <div class="modal-details">
    `;
    
    internship.details.forEach(detail => {
        contentHTML += `
            <div class="modal-detail">
                <i class="${detail.icon}"></i>
                <span>${detail.text}</span>
            </div>
        `;
    });
    
    contentHTML += `
        </div>
        <a href="${internship.link}" target="_blank" class="apply-btn">
            <span>Apply Now</span>
            <i class="fas fa-paper-plane"></i>
        </a>
    `;
    
    modalContent.innerHTML = contentHTML;
    modal.style.display = 'block';
    
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        const modalDetails = document.querySelectorAll('.modal-detail');
        modalDetails.forEach((detail, index) => {
            detail.style.opacity = '0';
            detail.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                detail.style.transition = 'all 0.4s ease';
                detail.style.opacity = '1';
                detail.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }, 50);
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

viewDetailsBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const categories = ['web', 'app', 'python', 'java'];
        openModal(categories[index]);
    });
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
});