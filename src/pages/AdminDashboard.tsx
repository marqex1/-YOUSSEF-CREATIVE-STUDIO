import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard, Plus, Edit, Trash2, LogOut, Users, FolderKanban,
  Briefcase, TrendingUp, FileText, Image as ImageIcon, Settings, X,
  Check, Eye, EyeOff, Upload, Sparkles, MessageSquare
} from 'lucide-react';

type Tab = 'overview' | 'projects' | 'services' | 'campaigns' | 'articles' | 'media' | 'settings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    projects, services, campaigns, articles, socialLinks, siteSettings,
    addProject, updateProject, deleteProject,
    addService, updateService, deleteService,
    addCampaign, updateCampaign, deleteCampaign,
    addArticle, updateArticle, deleteArticle,
    addSocialLink, updateSocialLink, deleteSocialLink,
    updateSettings, logout, isAuthenticated, user,
    addMediaAsset, mediaAssets, deleteMediaAsset
  } = useStore();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'service' | 'campaign' | 'article' | 'settings' | 'social' | 'media' | ''>('');
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [projectForm, setProjectForm] = useState<any>({});
  const [serviceForm, setServiceForm] = useState<any>({});
  const [campaignForm, setCampaignForm] = useState<any>({});
  const [articleForm, setArticleForm] = useState<any>({});
  const [settingsForm, setSettingsForm] = useState<any>(siteSettings);
  const [socialForm, setSocialForm] = useState<any>({});

  if (!isAuthenticated) {
    navigate('/admin-login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openModal = (type: Tab) => {
    setActiveTab(type);
    setShowModal(true);
    setEditingItem(null);

    switch (type) {
      case 'projects':
        setModalType('project');
        setProjectForm({});
        break;
      case 'services':
        setModalType('service');
        setServiceForm({});
        break;
      case 'campaigns':
        setModalType('campaign');
        setCampaignForm({});
        break;
      case 'articles':
        setModalType('article');
        setArticleForm({});
        break;
      case 'settings':
        setModalType('settings');
        setSettingsForm(siteSettings);
        break;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  // Save Handlers
  const saveProject = () => {
    if (editingItem) {
      updateProject(editingItem.id, projectForm);
    } else {
      addProject({
        ...projectForm,
        tags: projectForm.tags ? projectForm.tags.split(',').map((t: string) => t.trim()) : [],
        images: projectForm.images ? [projectForm.images] : [],
        published: true,
        featured: false,
      });
    }
    closeModal();
  };

  const saveService = () => {
    if (editingItem) {
      updateService(editingItem.id, serviceForm);
    } else {
      addService({
        ...serviceForm,
        order: services.length + 1,
        featured: false,
      });
    }
    closeModal();
  };

  const saveCampaign = () => {
    if (editingItem) {
      updateCampaign(editingItem.id, campaignForm);
    } else {
      addCampaign({
        ...campaignForm,
        budget: Number(campaignForm.budget) || 0,
        reach: Number(campaignForm.reach) || 0,
        impressions: Number(campaignForm.impressions) || 0,
        ctr: Number(campaignForm.ctr) || 0,
        cpc: Number(campaignForm.cpc) || 0,
        cpm: Number(campaignForm.cpm) || 0,
        conversions: Number(campaignForm.conversions) || 0,
        roas: Number(campaignForm.roas) || 0,
        screenshots: [],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      });
    }
    closeModal();
  };

  const saveArticle = () => {
    if (editingItem) {
      updateArticle(editingItem.id, articleForm);
    } else {
      addArticle({
        ...articleForm,
        tags: articleForm.tags ? articleForm.tags.split(',').map((t: string) => t.trim()) : [],
        published: true,
      });
    }
    closeModal();
  };

  const saveSettings = () => {
    updateSettings(settingsForm);
    closeModal();
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'projects', name: 'Portfolio', icon: FolderKanban },
    { id: 'services', name: 'Services', icon: Briefcase },
    { id: 'campaigns', name: 'Campaigns', icon: TrendingUp },
    { id: 'articles', name: 'Writing', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Youssef Creative Studio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Projects</span>
                  <span className="text-lg font-bold text-indigo-600">{projects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Services</span>
                  <span className="text-lg font-bold text-purple-600">{services.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Campaigns</span>
                  <span className="text-lg font-bold text-green-600">{campaigns.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Articles</span>
                  <span className="text-lg font-bold text-orange-600">{articles.length}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                  <button
                    onClick={() => openModal('projects')}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                  </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-indigo-600" />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">{projects.length}</span>
                    </div>
                    <p className="text-gray-600">Total Projects</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">{services.length}</span>
                    </div>
                    <p className="text-gray-600">Active Services</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">{campaigns.length}</span>
                    </div>
                    <p className="text-gray-600">Campaigns</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">{articles.length}</span>
                    </div>
                    <p className="text-gray-600">Writing Projects</p>
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                  </div>
                  <div className="p-6">
                    {projects.length > 0 ? (
                      <div className="space-y-4">
                        {projects.slice(0, 5).map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h4 className="font-medium text-gray-900">{project.title}</h4>
                              <p className="text-sm text-gray-600">{project.category}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingItem(project);
                                  setProjectForm(project);
                                  setModalType('project');
                                  setShowModal(true);
                                }}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Portfolio Manager</h2>
                  <button
                    onClick={() => {
                      setProjectForm({});
                      setEditingItem(null);
                      setModalType('project');
                      setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {projects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg mr-3" />
                                <div>
                                  <p className="font-medium text-gray-900">{project.title}</p>
                                  <p className="text-sm text-gray-500">{project.description?.substring(0, 50)}...</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{project.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{project.clientName}</td>
                            <td className="px-6 py-4">
                              {project.featured ? (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Yes</span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">No</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingItem(project);
                                    setProjectForm(project);
                                    setModalType('project');
                                    setShowModal(true);
                                  }}
                                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => deleteProject(project.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {projects.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Services Manager</h2>
                  <button
                    onClick={() => {
                      setServiceForm({});
                      setEditingItem(null);
                      setModalType('service');
                      setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        {service.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Featured</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(service);
                            setServiceForm(service);
                            setModalType('service');
                            setShowModal(true);
                          }}
                          className="flex-1 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="flex-1 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Campaign Results Manager</h2>
                  <button
                    onClick={() => {
                      setCampaignForm({});
                      setEditingItem(null);
                      setModalType('campaign');
                      setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Campaign
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROAS</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {campaigns.map((campaign) => (
                          <tr key={campaign.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <p className="font-medium text-gray-900">{campaign.campaignName}</p>
                              <p className="text-sm text-gray-500">{campaign.notes}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{campaign.platform}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">${campaign.budget.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className="text-green-600 font-medium">{campaign.roas}x</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingItem(campaign);
                                    setCampaignForm(campaign);
                                    setModalType('campaign');
                                    setShowModal(true);
                                  }}
                                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => deleteCampaign(campaign.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {campaigns.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No campaigns yet. Add your first campaign!</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Content Writing Manager</h2>
                  <button
                    onClick={() => {
                      setArticleForm({});
                      setEditingItem(null);
                      setModalType('article');
                      setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Article
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs mb-2 inline-block">
                            {article.contentType}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.preview}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.platform}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(article);
                              setArticleForm(article);
                              setModalType('article');
                              setShowModal(true);
                            }}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {articles.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No articles yet. Add your first article!</p>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
                  <button
                    onClick={() => {
                      setSettingsForm(siteSettings);
                      setModalType('settings');
                      setShowModal(true);
                    }}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Edit Settings
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Title</label>
                        <p className="text-gray-900">{siteSettings.heroTitle}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Titles Rotation</label>
                        <p className="text-gray-900">{siteSettings.heroTitles.length} titles</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">WhatsApp Number</label>
                        <p className="text-gray-900">{siteSettings.whatsappNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Meta Title</label>
                        <p className="text-gray-900">{siteSettings.seoTitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                    <p className="text-gray-600">{siteSettings.socialLinks?.length || socialLinks.length} active links</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit' : 'Add New'} {modalType === 'project' ? 'Project' : modalType === 'service' ? 'Service' : modalType === 'campaign' ? 'Campaign' : modalType === 'article' ? 'Article' : 'Settings'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Project Form */}
              {modalType === 'project' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={projectForm.category || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Logo Design">Logo Design</option>
                      <option value="Branding">Branding</option>
                      <option value="Print Design">Print Design</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Media Buying">Media Buying</option>
                      <option value="Copywriting">Copywriting</option>
                      <option value="Content Writing">Content Writing</option>
                      <option value="Marketing Campaigns">Marketing Campaigns</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={projectForm.clientName || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={projectForm.description || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Project description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.tags || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="design, branding, marketing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={projectForm.images || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              )}

              {/* Service Form */}
              {modalType === 'service' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                    <input
                      type="text"
                      value={serviceForm.name || ''}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Service Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={serviceForm.description || ''}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Service description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={serviceForm.category || ''}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="content">Content</option>
                      <option value="ai">AI</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={serviceForm.featured || false}
                      onChange={(e) => setServiceForm({ ...serviceForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Featured Service</label>
                  </div>
                </div>
              )}

              {/* Campaign Form */}
              {modalType === 'campaign' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                    <input
                      type="text"
                      value={campaignForm.campaignName || ''}
                      onChange={(e) => setCampaignForm({ ...campaignForm, campaignName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Campaign Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    <select
                      value={campaignForm.platform || ''}
                      onChange={(e) => setCampaignForm({ ...campaignForm, platform: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Platform</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Google">Google</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Twitter">Twitter</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                      <input
                        type="number"
                        value={campaignForm.budget || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reach</label>
                      <input
                        type="number"
                        value={campaignForm.reach || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, reach: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Impressions</label>
                      <input
                        type="number"
                        value={campaignForm.impressions || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, impressions: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CTR (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={campaignForm.ctr || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, ctr: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                      <input
                        type="number"
                        value={campaignForm.conversions || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, conversions: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ROAS</label>
                      <input
                        type="number"
                        step="0.1"
                        value={campaignForm.roas || ''}
                        onChange={(e) => setCampaignForm({ ...campaignForm, roas: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={campaignForm.notes || ''}
                      onChange={(e) => setCampaignForm({ ...campaignForm, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Campaign notes..."
                    />
                  </div>
                </div>
              )}

              {/* Article Form */}
              {modalType === 'article' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                    <input
                      type="text"
                      value={articleForm.title || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Article Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    <input
                      type="text"
                      value={articleForm.platform || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, platform: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Blog, Facebook, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    <select
                      value={articleForm.contentType || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, contentType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Blog Writing">Blog Writing</option>
                      <option value="Social Media Content">Social Media Content</option>
                      <option value="Ad Copy">Ad Copy</option>
                      <option value="Product Description">Product Description</option>
                      <option value="Website Content">Website Content</option>
                      <option value="SEO Articles">SEO Articles</option>
                      <option value="Email Marketing">Email Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={articleForm.category || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Category"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <textarea
                      value={articleForm.preview || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, preview: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Short preview..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                    <textarea
                      value={articleForm.fullContent || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, fullContent: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Full article content..."
                    />
                  </div>
                </div>
              )}

              {/* Settings Form */}
              {modalType === 'settings' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={settingsForm.heroTitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="201032869945"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Biography</label>
                    <textarea
                      value={settingsForm.aboutBiography || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutBiography: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your biography..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={settingsForm.seoTitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Page title for SEO"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={modalType === 'settings' ? saveSettings : modalType === 'project' ? saveProject : modalType === 'service' ? saveService : modalType === 'campaign' ? saveCampaign : saveArticle}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
