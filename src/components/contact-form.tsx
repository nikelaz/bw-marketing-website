import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { colors, fontSizes, fontWeights } from '../styles/theme.stylex';
import Input from './input';
import Textarea from './textarea';
import Select from './select';

const styles = stylex.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  honeypot: {
    position: 'absolute',
    left: '-9999px',
    opacity: 0,
    height: 0,
    width: 0,
    overflow: 'hidden',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: fontSizes['20'],
    fontWeight: fontWeights.semibold,
    color: colors.white,
    backgroundColor: {
      default: colors.prim,
      ':hover': colors.primHover,
      ':disabled': colors.ash600,
    },
    border: 'none',
    borderRadius: '0.416rem',
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    transition: 'background-color 0.2s ease',
    width: 'fit-content',
  },
  message: {
    padding: '1rem',
    borderRadius: '0.416rem',
    fontSize: fontSizes['20'],
  },
  success: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },
});

const categoryOptions = [
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'question', label: 'General Question' },
  { value: 'account', label: 'Account Issue' },
  { value: 'other', label: 'Other' },
];

interface FormState {
  name: string;
  email: string;
  category: string;
  subject: string;
  description: string;
  honeypot: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  category: '',
  subject: '',
  description: '',
  honeypot: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/create-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        setFormData(initialFormState);
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
      {/* Honeypot field for spam protection */}
      <div {...stylex.props(styles.honeypot)}>
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Input
        label="Name"
        name="name"
        type="text"
        required
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        required
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <Select
        label="Category"
        name="category"
        options={categoryOptions}
        required
        placeholder="Select a category"
        value={formData.category}
        onChange={handleChange}
      />

      <Input
        label="Subject"
        name="subject"
        type="text"
        required
        placeholder="Brief summary of your issue"
        value={formData.subject}
        onChange={handleChange}
      />

      <Textarea
        label="Description"
        name="description"
        required
        placeholder="Please describe your issue or question in detail..."
        rows={6}
        value={formData.description}
        onChange={handleChange}
      />

      {submitStatus !== 'idle' && (
        <div {...stylex.props(
          styles.message,
          submitStatus === 'success' ? styles.success : styles.error
        )}>
          {statusMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        {...stylex.props(styles.button)}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
      </button>
    </form>
  );
};

export default ContactForm;
