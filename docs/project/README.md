# Project Management

This directory tracks overall project progress, versions, milestones, and team coordination for MACHUPS.

## Structure

- [ROADMAP.md](./ROADMAP.md) - Product roadmap and release schedule
- [MILESTONES.md](./MILESTONES.md) - Key milestones and deadlines
- [VERSIONS.md](./VERSIONS.md) - Version history and release notes
- [KANBAN.md](./KANBAN.md) - Current sprint board and task tracking
- [TEAM.md](./TEAM.md) - Team structure and responsibilities
- [MEETINGS.md](./MEETINGS.md) - Meeting notes and decisions

## Current Status

### Active Sprint
**Sprint 2** (Dec 4-11, 2025)
- Focus: Auto-deploy feature + social media assets
- Story points: 34
- Completion: 15%

### Next Release
**v0.3.0** - Auto Deploy & NFT Minting
- Target: December 11, 2025
- Status: In Development
- Features: 5 major, 12 minor
- Blockers: None

### Project Health
- **On Track** ✅
- Velocity: 28 points/sprint (target: 30)
- Bug count: 3 open, 0 critical
- Test coverage: 78% (target: 80%)
- Technical debt: Low

## Quick Links

- [GitHub Projects](https://github.com/4eckd/monad-blitz-sf/projects)
- [Issue Tracker](https://github.com/4eckd/monad-blitz-sf/issues)
- [Pull Requests](https://github.com/4eckd/monad-blitz-sf/pulls)
- [CI/CD Pipeline](https://github.com/4eckd/monad-blitz-sf/actions)
- [Deployment Status](https://app.machups.com/status)

## Communication Channels

- **Discord**: [MACHUPS Dev Server](https://discord.gg/machups)
- **Telegram**: [@machups_dev](https://t.me/machups_dev)
- **Email**: dev@machups.com
- **GitHub Discussions**: [Link](https://github.com/4eckd/monad-blitz-sf/discussions)

## Development Workflow

### 1. Feature Development
```
Issue Created → Branch Created → Development → Tests → PR → Review → Merge → Deploy
```

### 2. Bug Fixes
```
Bug Reported → Triaged → Assigned → Fixed → Tests → PR → Review → Merge → Deploy
```

### 3. Hotfixes
```
Critical Bug → Hotfix Branch → Fix → Tests → Emergency PR → Deploy → Post-mortem
```

## Release Process

### Pre-Release Checklist
- [ ] All features complete and tested
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Migration scripts ready (if needed)
- [ ] Performance tested
- [ ] Security audit passed

### Release Steps
1. Create release branch
2. Final testing and QA
3. Tag release
4. Deploy to production
5. Monitor for issues
6. Announce release
7. Close milestone

### Post-Release
- Collect user feedback
- Monitor error rates
- Address critical issues
- Plan next iteration

---

**Project Manager**: Fused Gaming Development Team
**Repository**: [4eckd/monad-blitz-sf](https://github.com/4eckd/monad-blitz-sf)
**License**: MIT
**Last Updated**: December 4, 2025
