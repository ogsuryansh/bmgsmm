import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Footer } from './Sections';

const PageLayout = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 120, paddingBottom: 80 }} className="container">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h1 className="section-title" style={{ fontSize: '2.8rem', marginBottom: 32, textAlign: 'center' }}>
            {title}
          </h1>
          <div className="legal-content" style={{ background: 'var(--bg-card)', padding: '48px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const About = () => (
  <PageLayout title="About BMG">
    <p>BMG Organic is a digital marketing and social media growth platform built to help creators, influencers, brands, and online businesses improve their social media presence through structured promotional services, campaign planning, analytics support, and engagement-focused growth solutions.</p>
    <p>Our goal is to make social media promotion easier, more organized, and more transparent. We provide services that help customers manage growth campaigns, understand performance, improve content visibility, and plan social media activity in a more professional way.</p>
    <p>BMG Organic focuses on responsible digital promotion. We do not ask users for passwords, OTPs, or private account access. Customers are responsible for providing correct public links, usernames, campaign details, and order information so that services can be processed properly.</p>
    <p>Our platform is suitable for creators, small businesses, resellers, agencies, and individuals who want support with social media marketing, content promotion, campaign tracking, and analytics-based growth planning.</p>
    <p>For support, questions, or service-related help, users can contact us at: <a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
  </PageLayout>
);

export const Contact = () => (
  <PageLayout title="Contact Us">
    <p>Need help with an order, payment, refund request, or service issue? You can contact the BMG Organic support team anytime through email.</p>
    <h2>Support Email</h2>
    <p><a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
    <h2>What Users Should Include in Support Requests</h2>
    <ul>
      <li>Registered email address</li>
      <li>Order ID or payment reference ID</li>
      <li>Service purchased</li>
      <li>Public social media link or username related to the order</li>
      <li>Clear description of the issue</li>
    </ul>
    <p>Our support team usually responds within 24 to 48 business hours.</p>
  </PageLayout>
);

export const Terms = () => (
  <PageLayout title="Terms of Service">
    <p>Welcome to BMG Organic. By accessing our website, creating an account, placing an order, or using our services, you agree to the following Terms of Service.</p>
    
    <h2>Overview</h2>
    <p>BMG Organic provides digital marketing, social media promotion, campaign support, analytics assistance, and related online growth services. Our services are intended to help users improve their online visibility and manage promotional campaigns in an organized way.</p>
    
    <h2>User Responsibility</h2>
    <p>By using our platform, you agree that you will provide accurate order details; only submit public links, usernames, or content that you own or are authorized to promote; not use our services for illegal, harmful, abusive, misleading, or prohibited activity; and follow the rules and policies of the social media platforms you use.</p>
    
    <h2>Account Security</h2>
    <p>BMG Organic does not require your social media password. Users should never share passwords, OTPs, private login credentials, or sensitive account access with anyone.</p>
    <p>If you share incorrect information or lose access to your own social media account, BMG Organic is not responsible for any loss caused outside our platform.</p>
    
    <h2>Service Delivery</h2>
    <p>Delivery time may vary depending on the selected service, order size, platform conditions, technical delays, or campaign requirements.</p>
    <p>We try our best to process orders smoothly, but we do not guarantee exact delivery speed, exact results, permanent engagement, viral reach, sales, followers, revenue, or platform ranking.</p>
    
    <h2>Payments</h2>
    <p>All payments must be completed through the available payment methods on our website. Once payment is successful, the order will be processed according to the selected service.</p>
    <p>Users must ensure that payment details, billing details, and order information are correct before completing the transaction.</p>
    
    <h2>Order Cancellation</h2>
    <p>Orders can only be cancelled if they have not started processing. Once an order is in progress, completed, or already delivered, cancellation may not be possible.</p>
    
    <h2>Prohibited Use</h2>
    <p>You may not use BMG Organic for fraudulent activity, spam campaigns, harassment or abuse, impersonation, promotion of illegal products or services, misleading or deceptive activity, or any activity that violates applicable law or platform policies.</p>
    <p>We reserve the right to reject, cancel, or suspend any order or account that violates these terms.</p>
    
    <h2>Limitation of Liability</h2>
    <p>BMG Organic is not responsible for losses caused by social media platform updates, account restrictions, username changes, deleted posts, private accounts, incorrect links, third-party actions, or user mistakes. Our liability is limited to the amount paid for the affected service.</p>
    
    <h2>Changes to Terms</h2>
    <p>We may update these Terms of Service from time to time. Continued use of our website means you accept the updated terms.</p>
    
    <h2>Contact</h2>
    <p>For any questions about these Terms, contact us at: <a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
  </PageLayout>
);

export const RefundPolicy = () => (
  <PageLayout title="Refund Policy">
    <p>At BMG Organic, we aim to provide clear and reliable digital marketing services. Please read our refund policy carefully before placing an order.</p>
    
    <h2>Refund Eligibility</h2>
    <ul>
      <li>Payment was successful but the order was not created.</li>
      <li>The order could not be processed due to a technical issue from our side.</li>
      <li>The service was unavailable and no alternative solution was provided.</li>
      <li>The order was cancelled before processing started.</li>
    </ul>
    
    <h2>Non-Refundable Cases</h2>
    <ul>
      <li>The order has already started processing.</li>
      <li>The order has been completed.</li>
      <li>The user submitted an incorrect link, username, or order detail.</li>
      <li>The social media account or post was made private, deleted, restricted, or changed after placing the order.</li>
      <li>The delay was caused by social media platform issues or third-party platform updates.</li>
      <li>The user violated our Terms of Service.</li>
    </ul>
    
    <h2>Refund Timeline</h2>
    <p>Approved refunds will be processed to the original payment method. Refund timelines may depend on the payment provider, bank, or payment gateway.</p>
    
    <h2>How to Request a Refund</h2>
    <p>To request a refund, contact: <a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
    <p>Please include:</p>
    <ul>
      <li>Order ID</li>
      <li>Payment reference ID</li>
      <li>Registered email</li>
      <li>Reason for refund request</li>
      <li>Screenshot or proof of payment if available</li>
    </ul>
    <p>Refund requests are usually reviewed within 24 to 48 business hours.</p>
  </PageLayout>
);

export const PrivacyPolicy = () => (
  <PageLayout title="Privacy Policy">
    <p>BMG Organic respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>
    
    <h2>Information We Collect</h2>
    <ul>
      <li>Name</li>
      <li>Email address</li>
      <li>Phone number if provided</li>
      <li>Billing or payment-related details</li>
      <li>Order details</li>
      <li>Public social media usernames or links</li>
      <li>Website usage data</li>
      <li>Support messages and communication history</li>
    </ul>
    <p>We do not ask for social media passwords, OTPs, or private login credentials.</p>
    
    <h2>How We Use Your Information</h2>
    <ul>
      <li>Create and manage your account</li>
      <li>Process payments and orders</li>
      <li>Provide customer support</li>
      <li>Improve our services</li>
      <li>Send service updates</li>
      <li>Prevent fraud, abuse, or misuse</li>
      <li>Comply with legal or payment gateway requirements</li>
    </ul>
    
    <h2>Payment Information</h2>
    <p>Payments are processed through secure third-party payment providers. BMG Organic does not store complete card details, UPI PINs, banking passwords, or sensitive payment authentication information.</p>
    
    <h2>Sharing of Information</h2>
    <p>We may share necessary information with payment gateway providers, service processing partners, technical support providers, and legal or regulatory authorities when required. We do not sell your personal information.</p>
    
    <h2>Data Security</h2>
    <p>We use reasonable technical and organizational measures to protect user data. However, no online system is 100% secure, and users should also protect their own account information.</p>
    
    <h2>User Rights</h2>
    <p>You may contact us to request correction, update, or deletion of your personal information, subject to legal, payment, and business record requirements.</p>
    
    <h2>Contact</h2>
    <p>For privacy-related questions, contact: <a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
  </PageLayout>
);

export const CookiePolicy = () => (
  <PageLayout title="Cookie Policy">
    <p>BMG Organic may use cookies and similar technologies to improve website performance, understand user activity, and provide a better browsing experience.</p>
    
    <h2>What Are Cookies?</h2>
    <p>Cookies are small files stored on your browser or device when you visit a website. They help the website remember preferences, improve speed, and understand how users interact with pages.</p>
    
    <h2>Types of Cookies We May Use</h2>
    <ul>
      <li><strong>Essential cookies</strong> for website functionality</li>
      <li><strong>Analytics cookies</strong> to understand website performance</li>
      <li><strong>Preference cookies</strong> to remember user settings</li>
      <li><strong>Security cookies</strong> to help protect accounts and prevent misuse</li>
    </ul>
    
    <h2>Third-Party Cookies</h2>
    <p>Some cookies may be placed by third-party tools such as analytics providers, payment gateways, or security services.</p>
    
    <h2>Managing Cookies</h2>
    <p>You can control or disable cookies through your browser settings. However, disabling some cookies may affect website functionality.</p>
    
    <h2>Contact</h2>
    <p>For cookie-related questions, contact: <a href="mailto:bmgorganic@gmail.com">bmgorganic@gmail.com</a></p>
  </PageLayout>
);
