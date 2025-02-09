const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in config/.env.local');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const GLOSSARY_TERMS = [
    {
      "term": "Real-Time Operating System (RTOS)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "An operating system designed to handle real-time tasks with strict timing constraints."
    },
    {
      "term": "Microcontroller Unit (MCU)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A compact integrated circuit that contains a processor, memory, and input/output peripherals for embedded applications."
    },
    {
      "term": "Field Programmable Gate Array (FPGA)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A reconfigurable semiconductor device that can be programmed for specific embedded applications."
    },
    {
      "term": "System-on-Chip (SoC)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A single chip that integrates a microprocessor, memory, and other components to perform embedded tasks."
    },
    {
      "term": "Embedded C Programming",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A specialized version of the C programming language optimized for embedded software development."
    },
    {
      "term": "Power Management IC (PMIC)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "An integrated circuit used to manage power distribution in embedded devices."
    },
    {
      "term": "Flash Memory",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A type of non-volatile memory used for storing firmware and data in embedded systems."
    },
    {
      "term": "Interrupt Handling",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A mechanism that allows embedded systems to respond to external events in real time."
    },
    {
      "term": "Bootloader",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A small program that initializes the hardware and loads the embedded operating system."
    },
    {
      "term": "Low-Power Design",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A set of techniques used to reduce energy consumption in battery-powered embedded devices."
    },
    {
      "term": "CAN Bus",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A robust vehicle networking protocol used for communication between embedded systems in automobiles."
    },
    {
      "term": "Embedded Machine Learning (Edge AI)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "The integration of AI models into embedded systems to enable local decision-making without cloud reliance."
    },
    {
      "term": "JTAG Debugging",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A hardware debugging interface used for testing and programming embedded devices."
    },
    {
      "term": "Sensor Fusion",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "The process of combining data from multiple sensors to improve accuracy and system performance."
    },
    {
      "term": "UART Communication",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A serial communication protocol used for data exchange between embedded devices."
    },
    {
      "term": "Watchdog Timer",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A hardware timer that resets the embedded system if it becomes unresponsive."
    },
    {
      "term": "Bare-Metal Programming",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "Developing embedded software without an operating system to achieve high performance and low latency."
    },
    {
      "term": "Embedded Security",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "Security practices used to protect embedded systems from attacks and unauthorized access."
    },
    {
      "term": "Haptic Feedback",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A technology that provides tactile feedback through vibrations or motions in embedded devices."
    },
    {
      "term": "Time-Sensitive Networking (TSN)",
      "icon": "mdi:expansion-card",
      "category": "Software Engineering",
      "vertical": "Embedded Systems",
      "description": "A networking standard designed to ensure real-time communication with low latency in embedded systems."
    }  
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  "Real-Time Operating System (RTOS)": ["Interrupt Handling", "Embedded C Programming", "Watchdog Timer", "Bare-Metal Programming", "System-on-Chip (SoC)"],
  "Microcontroller Unit (MCU)": ["System-on-Chip (SoC)", "Power Management IC (PMIC)", "Embedded C Programming", "JTAG Debugging", "Watchdog Timer"],
  "Field Programmable Gate Array (FPGA)": ["Sensor Fusion", "Embedded Machine Learning (Edge AI)", "JTAG Debugging", "Time-Sensitive Networking (TSN)", "Low-Power Design"],
  "System-on-Chip (SoC)": ["Microcontroller Unit (MCU)", "Real-Time Operating System (RTOS)", "Interrupt Handling", "Bootloader", "Flash Memory"],
  "Embedded C Programming": ["Real-Time Operating System (RTOS)", "Microcontroller Unit (MCU)", "Bare-Metal Programming", "JTAG Debugging", "Bootloader"],
  "Power Management IC (PMIC)": ["Low-Power Design", "Microcontroller Unit (MCU)", "Flash Memory", "Watchdog Timer", "Embedded Security"],
  "Flash Memory": ["Bootloader", "Embedded Security", "Low-Power Design", "Real-Time Operating System (RTOS)", "Power Management IC (PMIC)"],
  "Interrupt Handling": ["Real-Time Operating System (RTOS)", "System-on-Chip (SoC)", "Bare-Metal Programming", "Watchdog Timer", "UART Communication"],
  "Bootloader": ["Flash Memory", "Embedded C Programming", "System-on-Chip (SoC)", "Bare-Metal Programming", "JTAG Debugging"],
  "Low-Power Design": ["Power Management IC (PMIC)", "Embedded Security", "Flash Memory", "Bare-Metal Programming", "Field Programmable Gate Array (FPGA)"],
  "CAN Bus": ["UART Communication", "Time-Sensitive Networking (TSN)", "Embedded Machine Learning (Edge AI)", "Sensor Fusion", "Embedded Security"],
  "Embedded Machine Learning (Edge AI)": ["Sensor Fusion", "Field Programmable Gate Array (FPGA)", "CAN Bus", "Real-Time Operating System (RTOS)", "Embedded Security"],
  "JTAG Debugging": ["Microcontroller Unit (MCU)", "Bootloader", "Field Programmable Gate Array (FPGA)", "Embedded C Programming", "Interrupt Handling"],
  "Sensor Fusion": ["Embedded Machine Learning (Edge AI)", "CAN Bus", "Time-Sensitive Networking (TSN)", "UART Communication", "Real-Time Operating System (RTOS)"],
  "UART Communication": ["Interrupt Handling", "CAN Bus", "Sensor Fusion", "Bootloader", "Embedded C Programming"],
  "Watchdog Timer": ["Interrupt Handling", "Power Management IC (PMIC)", "Microcontroller Unit (MCU)", "Real-Time Operating System (RTOS)", "Embedded Security"],
  "Bare-Metal Programming": ["Embedded C Programming", "Bootloader", "Interrupt Handling", "Low-Power Design", "Real-Time Operating System (RTOS)"],
  "Embedded Security": ["CAN Bus", "Embedded Machine Learning (Edge AI)", "Power Management IC (PMIC)", "Flash Memory", "Watchdog Timer"],
  "Haptic Feedback": ["Sensor Fusion", "Embedded Machine Learning (Edge AI)", "CAN Bus", "Low-Power Design", "Time-Sensitive Networking (TSN)"],
  "Time-Sensitive Networking (TSN)": ["CAN Bus", "Sensor Fusion", "Haptic Feedback", "Field Programmable Gate Array (FPGA)", "Embedded Security"]
};

async function createGlossaryEntry(term, icon, category, vertical, description) {
  const filename = term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filePath = path.join(__dirname, '..', 'src', 'content', 'glossary', `${filename}.md`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Create a detailed glossary entry for the ${vertical} industry term "${term}". 
                 Use this description as a starting point: "${description}"
                 Include:
                 1. Start with a Detailed explanation of the term, no headings before this.
                 2. Display the rest of the content separated into h2 - h4 headings.
                 3. Common applications
                 4. Safety considerations if applicable
                 5. Related terms or concepts
                 6. Only use h2, h3, and h4 headings, do not use h1.
                 Format in markdown so i can copy and paste into the file, do not reiterate any of your instructions, do not diplay ticks around the markdown either.`
      }
    ],
    temperature: 0.7
  });

  const content = completion.choices[0].message.content;

  // Create frontmatter with vertical included
  const frontmatter = {
    term,
    icon,
    category,
    vertical,
    description,
    details: [
      {
        title: "Category",
        value: category
      },
      {
        title: "Industry",
        value: vertical
      },
      {
        title: "Related Terms",
        value: RELATED_TERMS[term] ? RELATED_TERMS[term].join(', ') : 'None'
      }
    ]
  };

  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created glossary entry: ${filename}.md (${vertical} - ${category})`);
}

async function createAllEntries() {
  // Group entries by vertical for logging
  const entriesByVertical = {};
  
  for (const entry of GLOSSARY_TERMS) {
    await createGlossaryEntry(entry.term, entry.icon, entry.category, entry.vertical, entry.description);
    
    // Track entries by vertical
    entriesByVertical[entry.vertical] = entriesByVertical[entry.vertical] || [];
    entriesByVertical[entry.vertical].push(entry.term);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Log summary by vertical
  console.log('\nCreated entries by vertical:');
  Object.entries(entriesByVertical).forEach(([vertical, terms]) => {
    console.log(`\n${vertical}:`);
    terms.forEach(term => console.log(`  - ${term}`));
  });
}

createAllEntries().catch(console.error); 