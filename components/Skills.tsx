interface Skill {
  name: string;
  icon: string;
  color: string;
}

export default function Skills() {
  const skills: Skill[] = [
    { name: 'HTML', icon: '🌐', color: 'bg-orange-600' },
    { name: 'CSS/SCSS', icon: '🎨', color: 'bg-blue-600' },
    { name: 'JavaScript', icon: 'JS', color: 'bg-yellow-500' },
    { name: 'TypeScript', icon: 'TS', color: 'bg-blue-500' },
    { name: 'Angular', icon: '🅰️', color: 'bg-red-600' },
    { name: 'Vue', icon: '⚡', color: 'bg-green-500' },
    { name: 'React', icon: '⚛️', color: 'bg-cyan-500' },
    { name: 'Git', icon: '📦', color: 'bg-orange-500' },
    { name: 'Linux', icon: '🐧', color: 'bg-gray-700' },
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-6 bg-dark-olive-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-2xl hover-scale-105 transition-all bg-primary hover-bg-teal-light"
            >
              <div className={`w-16 h-16 ${skill.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {skill.icon}
              </div>
              <h3 className="font-medium text-center text-primary">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

