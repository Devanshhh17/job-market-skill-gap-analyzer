import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const footerLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Skill Gap', path: '/skill-gap' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Admin', path: '/admin' }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mt-32 pt-20 border-t border-white/5 bg-gradient-to-b from-transparent via-black/30 to-black"
    >
      {/* Decorative gradient */}
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Skillect</p>
                <p className="text-gray-500 text-xs">Intelligence</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium AI-powered career intelligence platform for data professionals.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wide">Product</h4>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-gray-400 text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wide">Resources</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 text-sm hover:text-white transition-colors duration-300">Documentation</a>
              <a href="#" className="block text-gray-400 text-sm hover:text-white transition-colors duration-300">API Reference</a>
              <a href="#" className="block text-gray-400 text-sm hover:text-white transition-colors duration-300">Support</a>
              <a href="#" className="block text-gray-400 text-sm hover:text-white transition-colors duration-300">Status</a>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wide">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-white">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-white">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-white">
                <FaGithub size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="premium-divider my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 text-sm text-gray-400">
          <p>© {currentYear} Skillect. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer