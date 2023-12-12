import React, { useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  Chip,
  CardContent,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePhoto = ({ photo, onChange }) => {
    const [newPhoto, setNewPhoto] = useState(photo);
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      setNewPhoto(URL.createObjectURL(file));
      onChange(file);
    };
  
    return (
      <div style={{ marginBottom: '20px' }}>
        <img src={newPhoto} alt="Profile" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
        <input type="file" onChange={handlePhotoChange} style={{ marginTop: '10px' }} />
      </div>
    );
  };


const PersonalDetails = ({ firstName, lastName, email, onChange }) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'firstName') setNewFirstName(value);
    else if (field === 'lastName') setNewLastName(value);
    else if (field === 'email') setNewEmail(value);
  };

  const handleSaveChanges = () => {
    onChange({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    });
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Personal Details
      </Typography>
      {isEditing ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={newFirstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={newLastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={newEmail}
              onChange={(e) => handleInputChange(e, 'email')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginRight: '10px' }}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{`First Name: ${newFirstName}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{`Last Name: ${newLastName}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{`Email: ${newEmail}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton color="primary" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};


const AboutMeSection = ({ aboutMe, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(aboutMe);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedText);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          About Me:
        </Typography>
        {isEditing ? (
          <>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={editedText}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ marginBottom: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 1 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" paragraph>
              {aboutMe}
            </Typography>
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
};

const WorkExperienceSection = ({ workExperience, onAdd, onUpdate, onDelete }) => {
  const [newExperience, setNewExperience] = useState({ jobTitle: '', company: '', year: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      [field]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newExperience);
    setNewExperience({ jobTitle: '', company: '', year: '', description: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewExperience({ ...workExperience[index] });
  };

  const handleUpdate = () => {
    onUpdate(editIndex, newExperience);
    setEditIndex(null);
    setNewExperience({ jobTitle: '', company: '', year: '', description: '' });
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Work Experience
      </Typography>
      {workExperience.map((experience, index) => (
        <Accordion key={index} sx={{ marginBottom: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">{`${experience.jobTitle} at ${experience.company}`}</Typography>
                <Typography variant="subtitle2" color="textSecondary">{`${experience.year}`}</Typography>
              </Grid>
              <Grid item xs={2} textAlign="right">
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">{`Job Title: ${experience.jobTitle}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{`Company: ${experience.company}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{`Year: ${experience.year}`}</Typography>
              </Grid>
              {experience.description && (
                <>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{`Description: ${experience.description}`}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Divider />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label="Job Title"
            value={newExperience.jobTitle}
            onChange={(e) => handleInputChange(e, 'jobTitle')}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Company"
            value={newExperience.company}
            onChange={(e) => handleInputChange(e, 'company')}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Year"
            value={newExperience.year}
            onChange={(e) => handleInputChange(e, 'year')}
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="Description"
            value={newExperience.description}
            onChange={(e) => handleInputChange(e, 'description')}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {editIndex !== null ? (
            <>
              <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginRight: 1 }}>
                Update
              </Button>
              <Button variant="outlined" onClick={() => setEditIndex(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ marginTop: 1 }}>
              Add Work Experience
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};


const EducationSection = ({ education, onAdd, onUpdate, onDelete }) => {
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newEducation);
    setNewEducation({ degree: '', institution: '', year: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewEducation({ ...education[index] });
  };

  const handleUpdate = () => {
    onUpdate(editIndex, newEducation);
    setEditIndex(null);
    setNewEducation({ degree: '', institution: '', year: '' });
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Education:
        </Typography>
        <TextField
          label="Degree"
          value={newEducation.degree}
          onChange={(e) => handleInputChange(e, 'degree')}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Institution"
          value={newEducation.institution}
          onChange={(e) => handleInputChange(e, 'institution')}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Year"
          value={newEducation.year}
          onChange={(e) => handleInputChange(e, 'year')}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        {editIndex !== null ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginRight: 1 }}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => setEditIndex(null)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ marginTop: 1 }}>
            Add Education
          </Button>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {education.map((edu, index) => (
              <Accordion key={index} sx={{ marginBottom: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1">{`${edu.degree} at ${edu.institution}, ${edu.year}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Degree: ${edu.degree}`} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Institution: ${edu.institution}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Year: ${edu.year}`} />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

const SkillsSection = ({ skills, onAdd, onUpdate, onDelete }) => {
  const [newSkill, setNewSkill] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAdd = () => {
    onAdd(newSkill);
    setNewSkill('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewSkill(skills[index]);
  };

  const handleUpdate = () => {
    onUpdate(editIndex, newSkill);
    setEditIndex(null);
    setNewSkill('');
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Skills:
        </Typography>
        <TextField
          label="Skill"
          value={newSkill}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        {editIndex !== null ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginRight: 1 }}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => setEditIndex(null)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ marginTop: 1 }}>
            Add Skill
          </Button>
        )}
        <div style={{ marginTop: '10px' }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="primary"
              onDelete={() => handleDelete(index)}
              onClick={() => handleEdit(index)}
              sx={{ margin: '0.5rem', cursor: 'pointer' }}
              deleteIcon={<DeleteIcon />}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [aboutMe, setAboutMe] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleProfilePhotoChange = (photo) => {
    setProfilePhoto(photo);
  };

  const handleEducationAdd = (edu) => {
    setEducation((prevEducation) => [...prevEducation, edu]);
  };

  const handleEducationUpdate = (index, edu) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = edu;
      return updatedEducation;
    });
  };

  const handleEducationDelete = (index) => {
    setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index));
  };

  const handleSkillsAdd = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleSkillsUpdate = (index, skill) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = skill;
      return updatedSkills;
    });
  };

  const handleSkillsDelete = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };



  const handlePersonalDetailsChange = (details) => {
    setPersonalDetails(details);
  };

  const handleAboutMeAdd = (item) => {
    setAboutMe((prevAboutMe) => [...prevAboutMe, item]);
  };

  const handleAboutMeUpdate = (index, item) => {
    setAboutMe((prevAboutMe) => {
      const updatedAboutMe = [...prevAboutMe];
      updatedAboutMe[index] = item;
      return updatedAboutMe;
    });
  };

  const handleAboutMeSave = (newAboutMe) => {
    setAboutMe(newAboutMe);
  };

  const handleAboutMeDelete = (index) => {
    setAboutMe((prevAboutMe) => prevAboutMe.filter((_, i) => i !== index));
  };

  const handleWorkExperienceAdd = (experience) => {
    setWorkExperience((prevWorkExperience) => [...prevWorkExperience, experience]);
  };

  const handleWorkExperienceUpdate = (index, experience) => {
    setWorkExperience((prevWorkExperience) => {
      const updatedExperience = [...prevWorkExperience];
      updatedExperience[index] = experience;
      return updatedExperience;
    });
  };

  const handleWorkExperienceDelete = (index) => {
    setWorkExperience((prevWorkExperience) => prevWorkExperience.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
    console.log('Form Submitted:', { profilePhoto, personalDetails, aboutMe, workExperience });
  };

  const handleSaveAll = () => {
    // Collect data from each section and save it
    console.log('Saving all edits:', { profilePhoto, personalDetails, aboutMe, workExperience, education, skills });
    // Add logic to save the data to your backend or wherever it needs to be persisted
  };

  return (
    <Grid container spacing={3} sx={{ backgroundColor: '#E1F5FE', padding: '20px', minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'sans-serif', fontWeight: 'bold', marginBottom: '20px' }}>
          Profile
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
          <ProfilePhoto photo={profilePhoto} onChange={handleProfilePhotoChange} />
          <PersonalDetails {...personalDetails} onChange={handlePersonalDetailsChange} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
          <AboutMeSection
            aboutMe={aboutMe}
            onAdd={handleAboutMeAdd}
            onUpdate={handleAboutMeUpdate}
            onDelete={handleAboutMeDelete}
            onSave={handleAboutMeSave}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
          <WorkExperienceSection
            workExperience={workExperience}
            onAdd={handleWorkExperienceAdd}
            onUpdate={handleWorkExperienceUpdate}
            onDelete={handleWorkExperienceDelete}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
          <EducationSection
            education={education}
            onAdd={handleEducationAdd}
            onUpdate={handleEducationUpdate}
            onDelete={handleEducationDelete}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: '20px' }}>
          <SkillsSection skills={skills} onAdd={handleSkillsAdd} onUpdate={handleSkillsUpdate} onDelete={handleSkillsDelete} />
        </Paper>
      </Grid>
      {/* Add other sections with appropriate spacing */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSaveAll} sx={{ marginTop: '20px' }}>
          Save All Edits
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
